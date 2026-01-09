import 'package:connectivity_plus/connectivity_plus.dart';

Future<double> getSignalQualityScore() async {
  var result = await Connectivity().checkConnectivity();
  if (result == ConnectivityResult.none) return 0.0;
  return 4.0; // mock score for demo, replace with real signal API later
}
