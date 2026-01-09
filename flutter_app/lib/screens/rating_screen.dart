import 'package:flutter/material.dart';
import '../services/api_service.dart';

class RatingScreen extends StatelessWidget {
  final String leadId;
  final String userId;
  const RatingScreen({required this.leadId, required this.userId});

  @override
  Widget build(BuildContext context) {
    int rating = 5;
    return Column(
      children: [
        Slider(
          value: rating.toDouble(),
          min: 1,
          max: 5,
          divisions: 4,
          onChanged: (v) => rating = v.toInt(),
        ),
        ElevatedButton(
          onPressed: () => rateLead(leadId, rating, userId),
          child: Text("Submit Rating"),
        )
      ],
    );
  }
}
