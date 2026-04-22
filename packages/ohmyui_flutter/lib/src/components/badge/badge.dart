import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

enum OhMyUIBadgeVariant { success, warning, error, info, neutral }

enum OhMyUIBadgeSize { sm, md }

class OhMyUIBadge extends StatelessWidget {
  final String label;
  final OhMyUIBadgeVariant variant;
  final OhMyUIBadgeSize size;

  const OhMyUIBadge({
    super.key,
    required this.label,
    this.variant = OhMyUIBadgeVariant.neutral,
    this.size = OhMyUIBadgeSize.md,
  });

  Color get _backgroundColor => switch (variant) {
    OhMyUIBadgeVariant.success => const Color(0xFFDCFCE7),
    OhMyUIBadgeVariant.warning => const Color(0xFFFEF9C3),
    OhMyUIBadgeVariant.error => const Color(0xFFFEE2E2),
    OhMyUIBadgeVariant.info => OhMyUITokens.colorPrimary100,
    OhMyUIBadgeVariant.neutral => OhMyUITokens.colorNeutral100,
  };

  Color get _textColor => switch (variant) {
    OhMyUIBadgeVariant.success => OhMyUITokens.colorSuccess700,
    OhMyUIBadgeVariant.warning => OhMyUITokens.colorWarning700,
    OhMyUIBadgeVariant.error => OhMyUITokens.colorError700,
    OhMyUIBadgeVariant.info => OhMyUITokens.colorPrimary700,
    OhMyUIBadgeVariant.neutral => OhMyUITokens.colorNeutral700,
  };

  EdgeInsets get _padding => switch (size) {
    OhMyUIBadgeSize.sm => const EdgeInsets.symmetric(
      horizontal: OhMyUITokens.spacing2,
      vertical: OhMyUITokens.spacing1,
    ),
    OhMyUIBadgeSize.md => const EdgeInsets.symmetric(
      horizontal: OhMyUITokens.spacing3,
      vertical: OhMyUITokens.spacing1,
    ),
  };

  double get _fontSize => switch (size) {
    OhMyUIBadgeSize.sm => OhMyUITokens.fontSizeXs,
    OhMyUIBadgeSize.md => OhMyUITokens.fontSizeSm,
  };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: _padding,
      decoration: BoxDecoration(
        color: _backgroundColor,
        borderRadius: BorderRadius.circular(OhMyUITokens.radiusFull),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: _textColor,
          fontSize: _fontSize,
          fontWeight: OhMyUITokens.fontWeightMedium,
        ),
      ),
    );
  }
}
