import 'package:flutter/material.dart';
import '../services/api_service.dart';

class AnalyticsScreen extends StatelessWidget {
  final String userId;
  const AnalyticsScreen({required this.userId});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: fetchSalespersonAnalysis(userId),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return Scaffold(
            appBar: AppBar(title: Text("My Call Analytics")),
            body: Center(child: CircularProgressIndicator()),
          );
        }

        var report = snapshot.data as Map<String, dynamic>;

        return Scaffold(
          appBar: Text("My Call Analytics"),
          body: Padding(
            padding: EdgeInsets.all(16),
            child: ListView(
              children: [
                Card(
                  child: ListTile(
                    title: Text("Total Calls Made"),
                    trailing: Text(report['total_calls'].toString()),
                  ),
                ),
                Card(
                  child: ListTile(
                    title: Text("Unique Numbers Called"),
                    trailing: Text(report['unique_numbers'].toString()),
                  ),
                ),
                Card(
                  child: ListTile(
                    title: Text("Duplicate Calls %"),
                    trailing: Text("${report['duplicate_percent']}%"),
                  ),
                ),
                Card(
                  child: ListTile(
                    title: Text("Avg Call Duration"),
                    trailing: Text("${report['avg_duration']} sec"),
                  ),
                ),
                Card(
                  child: ListTile(
                    title: Text("Conversion Rate"),
                    trailing: Text("${report['conversion_rate']}%"),
                  ),
                ),
                SizedBox(height: 10),
                Text("Sentiment Breakdown", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Card(
                  child: Column(
                    children: [
                      ListTile(title: Text("Positive"), trailing: Text("${report['sentiment']['positive']}%")),
                      ListTile(title: Text("Neutral"), trailing: Text("${report['sentiment']['neutral']}%")),
                      ListTile(title: Text("Negative"), trailing: Text("${report['sentiment']['negative']}%")),
                    ],
                  ),
                ),
                SizedBox(height: 10),
                Text("AI Suggestions", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Card(
                  child: Padding(
                    padding: EdgeInsets.all(12),
                    child: Text(report['ai_tips'] ?? "No tips available"),
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }
}
