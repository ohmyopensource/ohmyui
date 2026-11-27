// Copyright 2026 The OhMyOpenSource! Authors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0

// @file ohmyui_flutter_test.dart
// @description Widget tests of the ohmyui_flutter package.

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
