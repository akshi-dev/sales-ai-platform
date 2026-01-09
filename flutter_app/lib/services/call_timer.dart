class CallTimer {
  int seconds = 0;
  bool running = false;

  void start() {
    running = true;
    seconds = 0;
  }

  void stop() {
    running = false;
  }
}
