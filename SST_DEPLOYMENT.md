# SST Deployment Guide

This project now supports deployment to AWS Lambda using SST (Serverless Stack) while maintaining compatibility with the existing Vercel deployment.

## New SST-Compatible API Endpoint

A new API endpoint has been created specifically for SST deployment:

- **SST Endpoint**: `/api/og-sst`
- **Vercel Endpoint**: `/api/og` (existing)

## Key Differences

### SST Endpoint (`/api/og-sst`)
- Uses SVG-based image generation (no external dependencies)
- Compatible with AWS Lambda runtime
- Uses standard Next.js API routes (not Edge Runtime)
- Returns SVG format for better compatibility
- Lightweight and fast
- **Text Wrapping**: Automatically wraps long titles (>15 chars) and descriptions (>20 chars)
- **Default Image**: Uses the same default image URL as the Vercel endpoint

### Vercel Endpoint (`/api/og`)
- Uses `@vercel/og` library
- Requires Edge Runtime
- Optimized for Vercel's infrastructure
- Returns PNG format
- Uses custom fonts

## Text Wrapping Features

The SST endpoint includes intelligent text wrapping:

- **Title Wrapping**: Breaks titles longer than 15 characters into multiple lines
- **Description Wrapping**: Breaks descriptions longer than 20 characters into multiple lines
- **Word Breaking**: Handles long words by breaking them at character boundaries
- **Dynamic Positioning**: Automatically adjusts line positions based on content length

### Example Text Wrapping

```
Title: "This is a very long title that should wrap"
Result: 
- "This is a very"
- "long title"

Description: "This is a very long description that should wrap"
Result:
- "This is a very long"
- "description"
```

## Default Image

Both endpoints use the same default image URL:
- **URL**: `https://res.cloudinary.com/yehez/image/upload/v1646485864/yehez_avatar_transparent_swwqcq.png`
- **Fallback**: Automatically used when no `imgUrl` parameter is provided
- **Custom Images**: Can be overridden by providing the `imgUrl` parameter

## Deployment

### Prerequisites
1. Install AWS CLI and configure credentials
2. Install SST CLI: `npm install -g sst`

### Deploy to SST
```bash
# Install dependencies
pnpm install

# Deploy to SST
pnpm sst:deploy
```

### Development with SST
```bash
# Start SST development environment
pnpm sst:dev
```

## Usage

### Frontend Integration

Update your frontend code to use the SST endpoint when deploying to AWS:

```typescript
// For SST deployment
const ogUrl = new URL(
  `/api/og-sst?title=${title}&desc=${desc}${
    imgUrl.length > 10 ? `&imgUrl=${imgUrl}` : ""
  }&siteName=${siteName}&socialMedia=${socialMedia}`,
  baseURL
);

// For Vercel deployment (existing)
const ogUrl = new URL(
  `/api/og?title=${title}&desc=${desc}${
    imgUrl.length > 10 ? `&imgUrl=${imgUrl}` : ""
  }&siteName=${siteName}&socialMedia=${socialMedia}`,
  baseURL
);
```

### Environment Detection

You can automatically detect the deployment environment:

```typescript
const isSST = process.env.NEXT_PUBLIC_DEPLOYMENT === 'sst';
const apiEndpoint = isSST ? '/api/og-sst' : '/api/og';

const ogUrl = new URL(
  `${apiEndpoint}?title=${title}&desc=${desc}${
    imgUrl.length > 10 ? `&imgUrl=${imgUrl}` : ""
  }&siteName=${siteName}&socialMedia=${socialMedia}`,
  baseURL
);
```

### Testing Both Endpoints

The frontend includes a toggle to test both endpoints:

1. Check the "Use SST Endpoint" checkbox to switch between endpoints
2. The URL will update automatically to show which endpoint is being used
3. Both endpoints accept the same parameters and return OG images
4. Test with long text to see the wrapping differences

## Configuration

### SST Configuration (`sst.config.ts`)
The SST configuration is set up to deploy the Next.js application to AWS Lambda with the following settings:
- Region: `us-east-1`
- Stack name: `vercel-og`
- Site name: `site`

### Environment Variables
Add any required environment variables in the `sst.config.ts` file:

```typescript
const site = new NextjsSite(stack, "site", {
  path: ".",
  environment: {
    NEXT_PUBLIC_DEPLOYMENT: "sst",
    // Add other environment variables here
  },
});
```

## Dependencies

The SST deployment requires these additional dependencies:
- `sst`: Serverless Stack framework

## Image Format

### SST Endpoint
- Returns SVG format
- Scalable and lightweight
- Better browser compatibility
- Faster generation
- Text wrapping support
- Same default image as Vercel endpoint

### Vercel Endpoint
- Returns PNG format
- Higher quality for complex designs
- Uses custom fonts
- More advanced rendering capabilities

## Performance Considerations

- The SST endpoint uses SVG which is lightweight and fast
- SVG format provides better scalability across different screen sizes
- No external dependencies required for image generation
- Text wrapping is handled efficiently
- Consider implementing caching strategies for better performance

## Future Enhancements

For production SST deployment, you can enhance the SVG-based approach with:

1. **Custom Fonts**: Embed font files in the SVG or use web fonts
2. **Advanced Styling**: Implement more complex gradients and effects
3. **Canvas Alternative**: Use libraries like `skia-canvas` or `node-canvas` in production
4. **Image Effects**: Add rounded corners, shadows, or other visual effects

## Troubleshooting

### Common Issues

1. **SVG Rendering**: Ensure the browser supports SVG format
2. **Text Wrapping**: Long words are automatically broken at character boundaries
3. **Lambda Timeout**: The default timeout is 30 seconds, which should be sufficient for SVG generation
4. **Image Loading**: Default image URL is used when no custom image is provided

### Debugging

Enable SST debugging:
```bash
pnpm sst:dev --verbose
```

Check Lambda logs in AWS CloudWatch for detailed error information.

### Testing

Test both endpoints locally:
```bash
# Start development server
pnpm dev

# Test Vercel endpoint
curl "http://localhost:3000/api/og?title=Test&desc=Description"

# Test SST endpoint with text wrapping
curl "http://localhost:3000/api/og-sst?title=ThisIsAVeryLongTitleThatShouldWrap&desc=ThisIsAVeryLongDescriptionThatShouldWrap"

# Test SST endpoint with default image
curl "http://localhost:3000/api/og-sst?title=Test&desc=Test"
``` 