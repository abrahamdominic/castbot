function withValidProperties(properties: Record<string, undefined | string | string[]>) {
return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
);
}

export async function GET() {
const URL = process.env.NEXT_PUBLIC_URL as string;
return Response.json({
  "accountAssociation": {  // these will be added in step 5
    "header": "eyJmaWQiOjg2MzA5MSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweGQ3MUQzNjE2MDEyRjZiODQ5QzNhZmQ4OGEyRDFGOEU4RmMzNzI2MEMifQ",
    "payload": "eyJkb21haW4iOiJwcm9tcHRjYXN0ZXIudmVyY2VsLmFwcCJ9",
    "signature": "OeUk1B6HSlpIEK6KwWJ7BeaMTKL3/lCxweUVTNNWVmU+Y6gOy3m7d74AL5RWL7AYTdI6Gi4h7BzKkb/+hu8EnRs="
  },
  "baseBuilder": {
    "ownerAddress": "0x772a7c60624F91E47fF19626dBdc692F36fc2C7a" // add your Base Account address here
  },
  "miniapp": {
    "version": "1",
    "name": "Prompt Caster Mini App",
    "homeUrl": "https://ex.co",
    "iconUrl": "https://ex.co/i.png",
    "splashImageUrl": "https://ex.co/l.png",
    "splashBackgroundColor": "#000000",
    "webhookUrl": "https://ex.co/api/webhook",
    "subtitle": "Fast, fun, social",
    "description": "AI Personalized Caster.",
    "screenshotUrls": [
      "https://ex.co/s1.png",
      "https://ex.co/s2.png",
      "https://ex.co/s3.png"
    ],
    "primaryCategory": "social",
    "tags": ["example", "miniapp", "baseapp"],
    "heroImageUrl": "https://ex.co/og.png",
    "tagline": "Play instantly",
    "ogTitle": "Example Mini App",
    "ogDescription": "Challenge friends in real time.",
    "ogImageUrl": "https://ex.co/og.png",
    "noindex": true
  }
}); // see the next step for the manifest_json_object
}