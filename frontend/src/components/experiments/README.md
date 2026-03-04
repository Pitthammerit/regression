# Experiments

This folder contains unused A/B test variants and experimental components that are not currently in production.

## Hero Section Variants

The following hero section variants were created for A/B testing but are currently not used in the main application. Only `HeroV3Section` (located in `../sections/HeroV3Section.jsx`) is active in production.

### Available Variants

1. **HeroAlt1.jsx**
   - Alternative hero design #1
   - Different layout and visual approach from production
   - Preserved for potential future testing

2. **HeroAlt2.jsx**
   - Alternative hero design #2
   - Minimal variant with simplified structure
   - Preserved for potential future testing

3. **HeroAlt3.jsx**
   - Alternative hero design #3
   - Experimental approach to hero section
   - Preserved for potential future testing

4. **HeroV2Section.jsx**
   - Previous version of the hero section (V2)
   - Replaced by HeroV3Section in production
   - Maintained for reference and potential rollback

## Usage

To test any of these variants:
1. Import the desired variant in `src/App.js`
2. Replace `<HeroV3Section />` with the imported component
3. Test locally with `npm start`
4. Revert changes after testing

## Adding New Experiments

When creating new A/B test variants:
1. Place them in this folder
2. Add documentation explaining the experimental approach
3. Update this README with the variant details
4. Remember to clean up after experiments conclude

## Note

These components are not maintained and may become outdated as the main codebase evolves. Use at your own risk and verify compatibility before testing.
