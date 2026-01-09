import 'package:flutter/material.dart';
import '../services/api_service.dart';

class LeadsScreen extends StatelessWidget {
  final String userId;
  const LeadsScreen({required this.userId});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: fetchMyLeads(userId),
      builder: (context, snapshot) {
        if (!snapshot.hasData) return Center(child: CircularProgressIndicator());
        var leads = snapshot.data!;
        return ListView.builder(
          itemCount: leads.length,
          itemBuilder: (context, i) {
            return ListTile(
              title: Text(leads[i]['name']),
              subtitle: Text(leads[i]['phone']),
              trailing: Icon(Icons.call),
              onTap: () async {
                var timer = CallTimer();
                timer.start();
                var signal = await getSignalQualityScore();

                await logCall({
                  "lead_id": leads[i]['id'],
                  "user_id": userId,
                  "duration": timer.seconds,
                  "phone": leads[i]['phone'],
                  "network_quality_score": signal,
                  "sentiment": null,
                  "summary": null,
                });
                timer.stop();
              },
            );
          },
        );
      },
    );
  }
}
