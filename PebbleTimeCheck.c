#include <pebble.h>
#include <stdlib.h>
  
static Window *s_main_window;
static TextLayer *s_time_layer;
static TextLayer *s_takepills;
static GFont s_pill_font;

static void update_time() {
  // Get a tm structure
  time_t temp = time(NULL); 
  
  struct tm *tick_time = localtime(&temp);
  
  struct tm *when = malloc(sizeof(struct tm));

  when->tm_wday = 6;
  when->tm_hour = 16;
  when->tm_min = 48;
  when->tm_sec = 0;
  
  // Create a long-lived buffer
  static char buffer[] = "00:00";

  // Write the current hours and minutes into the buffer
  if(clock_is_24h_style() == true) {
    //Use 2h hour format
    strftime(buffer, sizeof("00:00"), "%H:%M", tick_time);
  } else {
    //Use 12 hour format
    strftime(buffer, sizeof("00:00"), "%I:%M", tick_time);
  }
  
  if (tick_time->tm_min == when->tm_min){
    vibes_long_pulse();
    text_layer_set_text(s_takepills, "TAKE PILLS!");
  }
  else{
    // Display this time on the TextLayer
    text_layer_set_text(s_time_layer, buffer);
    text_layer_set_text(s_takepills, "Relax...");
  }
  
  
  
}

static void main_window_load(Window *window) {
  // Create time TextLayer
  s_time_layer = text_layer_create(GRect(0, 20, 144, 50));
  text_layer_set_background_color(s_time_layer, GColorClear);
  text_layer_set_text_color(s_time_layer, GColorBlack);
  text_layer_set_text(s_time_layer, "00:00");
  text_layer_set_font(s_time_layer, fonts_get_system_font(FONT_KEY_BITHAM_42_BOLD));
  text_layer_set_text_alignment(s_time_layer, GTextAlignmentCenter);
  
  // Create takepills TextLayer
  s_takepills = text_layer_create(GRect(0, 80, 144, 50));
  text_layer_set_background_color(s_takepills, GColorClear);
  text_layer_set_text_color(s_takepills, GColorBlack);
  text_layer_set_text(s_takepills, "Relax?");
  s_pill_font = fonts_load_custom_font(resource_get_handle(RESOURCE_ID_Perfect_Dos_20));
  text_layer_set_font(s_takepills, s_pill_font);
  text_layer_set_text_alignment(s_takepills, GTextAlignmentCenter);

  // Add it as a child layer to the Window's root layer
  layer_add_child(window_get_root_layer(window), text_layer_get_layer(s_time_layer));
  layer_add_child(window_get_root_layer(window), text_layer_get_layer(s_takepills));
  
  // Make sure the time is displayed from the start
  update_time();
}

static void main_window_unload(Window *window) {
  // Destroy TextLayer
  text_layer_destroy(s_time_layer);
  text_layer_destroy(s_takepills);
}

static void tick_handler(struct tm *tick_time, TimeUnits units_changed) {
  update_time();
}
  
static void init() {
  // Create main Window element and assign to pointer
  s_main_window = window_create();

  // Set handlers to manage the elements inside the Window
  window_set_window_handlers(s_main_window, (WindowHandlers) {
    .load = main_window_load,
    .unload = main_window_unload
  });

  // Show the Window on the watch, with animated=true
  window_stack_push(s_main_window, true);
  
  // Register with TickTimerService
  tick_timer_service_subscribe(MINUTE_UNIT, tick_handler);
}

static void deinit() {
  // Destroy Window
  window_destroy(s_main_window);
}

int main(void) {
  init();
  app_event_loop();
  deinit();
}
