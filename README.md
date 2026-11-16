# CLARV Travel and Business Center — Website + content admin

## What this includes
Public travel website with official uploaded logo, contact details, packages, photo and video gallery, and accreditation details as provided. A Pages CMS configuration (`.pages.yml`) enables staff to edit the packages and gallery with a visual interface after setup. No admin user account has been created yet.

## Publish and activate visual editing (recommended)
1. Create a **private or public GitHub repository** and upload all the files from this folder **including `.pages.yml`** at the repository root. GitHub account ownership stays with CLARV.
2. In Netlify, choose **Add new project > Import an existing project > GitHub** and connect this repository. Deploy it as a static site (no build command; publish directory `/` or repository root).
3. Visit https://pagescms.org/ and sign in with GitHub. Grant access to the CLARV repository when requested. Open that repository in Pages CMS. The `CLARV Website Content` editor reads `.pages.yml` and edits `content.json`.
4. Add/edit package details and gallery items, then save. Pages CMS commits the changes to GitHub. Netlify automatically republishes changes when the linked branch updates.
5. To upload images, use Pages CMS media library (assets/uploads) and copy the published image path `/assets/uploads/filename.jpg` into the relevant gallery **Photo URL** field. For package photos, use the Package Photo picker.
6. For videos, upload to YouTube and paste `https://www.youtube.com/embed/VIDEO_ID` in the gallery `src` field, selecting Video.
7. To allow staff editing, give them appropriate GitHub repository access and Pages CMS authorization. Do not publish GitHub tokens or passwords in the website.

Note: Pages CMS is a third-party service; its GitHub integration and interface may change. Confirm its current plan and permissions before inviting staff. If its CMS field schema changes, adjust `.pages.yml` accordingly.

## Local preview
Because the site fetches `content.json`, do not open `index.html` directly via `file://`. Start a local web server from this folder with `python -m http.server 8000` and open http://localhost:8000. Or view the deployed Netlify site.

## Important limitations
- Admin editing requires the GitHub + Pages CMS + Netlify connections above. The ZIP itself is not an authenticated dashboard or a live public website.
- Sample destination photos are stock photos, not official CLARV tour photographs.
- Booking form opens a prefilled email; it does not store or automatically submit inquiries or accept payment.
- Verify DTI, DOT and membership status and published rates before launch.
- Add privacy policy and consent notice if implementing stored booking inquiries.
