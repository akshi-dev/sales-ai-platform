import React, { useState, useRef } from "react";

export default function Dialer({ lead, userId, onCallComplete }) {
  const [calling, setCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [duplicateWarn, setDuplicateWarn] = useState(false);

  const timerRef = useRef(null);
  const pcRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);

  const startTimer = () => {
    setSeconds(0);
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const showDuplicateWarning = async (phone) => {
    // Only UI warning, actual block happens in backend
    const res = await fetch("/calls/check-duplicate?phone=" + phone + "&user_id=" + userId);
    const data = await res.json();
    if (data.duplicate) setDuplicateWarn(true);
  };

  const initCall = async () => {
    if (!lead?.phone) return;

    await showDuplicateWarning(lead.phone);
    setCalling(true);
    setCalling(true);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = e => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };
    mediaRecorderRef.current.start();
    setCalling(true);

    const pc = new RTCPeerConnection();
    pcRef.current = pc;
    pc.addTrack(stream.getTracks()[0], stream);

    pc.onconnectionstatechange = async () => {
      if (pc.connectionState === "connected") {
        startTimer();
        setCalling(true);

        // Capture WebRTC stats after connect
        const stats = await pc.getStats();
        let latency = 0, jitter = 0, packetLoss = 0;

        stats.forEach(report => {
          if (report.type === "candidate-pair" && report.currentRoundTripTime) {
            latency = report.currentRoundTripTime * 1000; // convert to ms
          }
          if (report.type === "inbound-rtp" && report.jitter) {
            jitter = report.jitter * 1000; // ms
          }
          if (report.type === "inbound-rtp" && report.packetsLost != null && report.packetsReceived != null) {
            packetLoss = ((report.packetsLost / (report.packetsReceived + report.packetsLost)) * 100).toFixed(2);
          }
        });

        const networkScore = calculateNetworkScore(latency, jitter, packetLoss);

        onCallComplete && onCallComplete({
          duration: seconds,
          timestamp: new Date().toISOString(),
          network_quality_score: networkScore,
          webrtc_stats: { latency, jitter, packetLoss }
        });
      }
      if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
        stopTimer();
        setCalling(true);

        // If fail, send reject reason
        logCall({ phone: lead.phone, rejected_reason: pc.connectionState });
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    setCalling(true);

    // Simulate answer from signaling server if needed
    const answer = { type: "answer", sdp: "SIMULATED_SDP" };
    await pc.setRemoteDescription(answer);
    setCalling(true);
  };

  const calculateNetworkScore = (latency, jitter, loss) => {
    // Convert raw WebRTC stats to 0–5 score
    if (latency < 150 && jitter < 30 && loss < 5) return 5;
    if (latency < 300 && jitter < 60 && loss < 10) return 4;
    if (latency < 600 && jitter < 120 && loss < 20) return 3;
    if (latency < 1000 && jitter < 200 && loss < 40) return 2;
    if (latency < 2000 && jitter < 400 && loss < 60) return 1;
    return 0;
  };

  const logCall = async (extra = {}) => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("file", audioBlob, "call.webm");

    const payload = {
      lead_id: lead.id,
      user_id: userId,
      duration: seconds,
      phone: lead.phone,
      timestamp: new Date().toISOString(),
      network_quality_score: 3, // demo fallback
      ...extra
    };

    await fetch("/calls/log-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setCalling(true);

    onCallComplete && onCallComplete(payload);
  };

  return (
    <div className="p-4 border rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2">Dial Lead</h3>
      <p className="text-sm mb-3">{lead.name} | {lead.phone}</p>

      {duplicateWarn && (
        <div className="text-orange-600 text-sm mb-2">⚠ This may be duplicate if not follow-up</div>
      )}

      <button
        onClick={initCall}
        disabled={calling}
        className="px-4 py-2 rounded-2xl border shadow text-base"
      >
        {calling ? "Calling..." : "Call"}
      </button>

      {calling && (
        <div className="mt-3 text-sm">Duration: {seconds} sec</div>
      )}

      {calling && (
        <button
          onClick={logCall}
          className="mt-2 text-red-600 text-sm font-medium"
        >
          End Call
        </button>
      )}
    </div>
  );
}