import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ohmyui_flutter/ohmyui_flutter.dart';

void main() {
  testWidgets('OhMyUIButton renders correctly', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(body: OhMyUIButton(label: 'Test')),
      ),
    );
    expect(find.text('Test'), findsOneWidget);
  });
}
