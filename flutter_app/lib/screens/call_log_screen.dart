import 'package:flutter/material.dart';

class CallLogScreen extends StatelessWidget {
  final Map<String, dynamic> call;
  const CallLogScreen({required this.call});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(12),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Summary:", style: TextStyle(fontWeight: FontWeight.bold)),
            Text(call['summary'] ?? "Analyzing..."),
            SizedBox(height: 8),
            Text("Outcome: ${call['outcome'] ?? ""}"),
            Text("Sentiment: ${call['sentiment'] ?? ""}"),
            Text("Call Score: ${call['call_quality_score'] ?? 0}"),
            Text("Network Score: ${call['network_quality_score'] ?? 0}"),
            Text("Follow-up: ${call['followup_required'] ?? false}"),
            Text("Follow-up Date: ${call['followup_date'] ?? ""}"),
            Text("Reject Reason: ${call['rejection_reason'] ?? "None"}"),
          ],
        ),
      ),
    );
  }
}
