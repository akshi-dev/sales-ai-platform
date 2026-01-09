import 'dart:convert';
import 'package:http/http.dart' as http;

const String BASE_URL = "http://<your-local-ip>:8000";

Future<List<dynamic>> fetchMyLeads(String userId) async {
  final response = await http.get(Uri.parse("$BASE_URL/leads/my-leads?user_id=$userId"));
  return jsonDecode(response.body);
}

Future<void> logCall(Map<String, dynamic> callData) async {
  await http.post(
    Uri.parse("$BASE_URL/calls/log-call"),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode(callData),
  );
}
Future<Map<String, dynamic>> fetchSalespersonAnalysis(String userId) async {
  final response = await http.get(Uri.parse("$BASE_URL/analytics/salesperson/$userId"));
  return jsonDecode(response.body);
}

Future<void> rateLead(String leadId, int rating, String userId) async {
  await http.post(
    Uri.parse("$BASE_URL/leads/rate-lead"),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode({"lead_id": leadId, "rating": rating, "user_id": userId}),
  );
}
