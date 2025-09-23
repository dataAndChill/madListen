import { StyleSheet } from 'react-native';
import { palette, radius, space, shadow } from './theme';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.bg },
  container: { flex: 1, padding: space.lg },
  title: { color: palette.text, fontSize: 24, fontWeight: '800', marginBottom: space.sm, letterSpacing: 0.2 },
  subtitle: { color: palette.textDim, fontSize: 15, fontWeight: '600', marginBottom: space.sm },
  body: { color: palette.text, fontSize: 15, lineHeight: 22 },

  card: {
    backgroundColor: palette.card,
    borderRadius: radius.lg,
    padding: space.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.divider,
    ...shadow.card,
  },

  inputRow: { flexDirection: 'row', gap: space.sm, marginTop: space.sm, marginBottom: space.md },
  input: {
    flex: 1,
    backgroundColor: palette.surface,
    color: palette.text,
    borderWidth: 1,
    borderColor: palette.divider,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingVertical: 12,
  },

  primaryBtn: {
    backgroundColor: palette.primary,
    paddingVertical: 12,
    paddingHorizontal: space.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  btnText: { color: '#0b1220', fontWeight: '800', letterSpacing: 0.3 },

  listItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.divider,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  chip: {
    backgroundColor: palette.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8, marginBottom: 8,
    borderWidth: 1, borderColor: palette.divider,
  },
  chipText: { color: palette.primary, fontWeight: '700' },

  navButtons: { flexDirection: 'row', gap: space.sm, marginTop: space.md, flexWrap: 'wrap' },
});
