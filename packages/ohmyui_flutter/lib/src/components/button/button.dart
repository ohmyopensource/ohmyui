// Copyright 2026 The OhMyOpenSource! Authors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0

// @file button.dart
// @description Button widget (`OhMyUIButton`): a button in three variants and
// three sizes, with a disabled state.

import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

enum OhMyUIButtonVariant { primary, secondary, ghost }

enum OhMyUIButtonSize { sm, md, lg }

class OhMyUIButton extends StatelessWidget {
  final String label;
  final OhMyUIButtonVariant variant;
  final OhMyUIButtonSize size;
  final bool disabled;
  final VoidCallback? onPressed;

  const OhMyUIButton({
    super.key,
    required this.label,
    this.variant = OhMyUIButtonVariant.primary,
    this.size = OhMyUIButtonSize.md,
    this.disabled = false,
    this.onPressed,
  });

  EdgeInsets get _padding => switch (size) {
    OhMyUIButtonSize.sm => const EdgeInsets.symmetric(
      horizontal: OhMyUITokens.spacing3,
      vertical: OhMyUITokens.spacing1,
    ),
    OhMyUIButtonSize.md => const EdgeInsets.symmetric(
      horizontal: OhMyUITokens.spacing4,
      vertical: OhMyUITokens.spacing2,
    ),
    OhMyUIButtonSize.lg => const EdgeInsets.symmetric(
      horizontal: OhMyUITokens.spacing6,
      vertical: OhMyUITokens.spacing3,
    ),
  };

  double get _fontSize => switch (size) {
    OhMyUIButtonSize.sm => OhMyUITokens.fontSizeSm,
    OhMyUIButtonSize.md => OhMyUITokens.fontSizeMd,
    OhMyUIButtonSize.lg => OhMyUITokens.fontSizeLg,
  };

  @override
  Widget build(BuildContext context) {
    return switch (variant) {
      OhMyUIButtonVariant.primary => ElevatedButton(
        onPressed: disabled ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: OhMyUITokens.colorPrimary500,
          foregroundColor: OhMyUITokens.colorNeutral0,
          padding: _padding,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(OhMyUITokens.radiusMd),
          ),
          textStyle: TextStyle(
            fontSize: _fontSize,
            fontWeight: OhMyUITokens.fontWeightMedium,
          ),
        ),
        child: Text(label),
      ),
      OhMyUIButtonVariant.secondary => OutlinedButton(
        onPressed: disabled ? null : onPressed,
        style: OutlinedButton.styleFrom(
          foregroundColor: OhMyUITokens.colorPrimary500,
          side: const BorderSide(color: OhMyUITokens.colorPrimary500, width: 2),
          padding: _padding,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(OhMyUITokens.radiusMd),
          ),
          textStyle: TextStyle(
            fontSize: _fontSize,
            fontWeight: OhMyUITokens.fontWeightMedium,
          ),
        ),
        child: Text(label),
      ),
      OhMyUIButtonVariant.ghost => TextButton(
        onPressed: disabled ? null : onPressed,
        style: TextButton.styleFrom(
          foregroundColor: OhMyUITokens.colorPrimary500,
          padding: _padding,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(OhMyUITokens.radiusMd),
          ),
          textStyle: TextStyle(
            fontSize: _fontSize,
            fontWeight: OhMyUITokens.fontWeightMedium,
          ),
        ),
        child: Text(label),
      ),
    };
  }
}
