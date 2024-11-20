This userscript allows you to freely download movies and photosets from ATK Network ([ATKHairy](https://atkhairy.com), [ATK Premium](https://atkpremium.com), [ATK Girlfriends](https://atkgirlfriends.com), [ATK Archives](https://atkarchives.com), [ATK Petites](https://atkpetites.com), [ATK Exotics](https://atkexotics.com) and [AMKingdom](https://amkingdom.com))

**To use this script:**

1. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey-beta/gcalenpjmijncebpfijmoaglllgpjagf) extension ([Tampermonkey Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/))
2. Open [the script](https://github.com/xdegeneratex/atk-downloader/raw/refs/heads/main/raw/main/dist/build.user.js) in your browser. This should automatically open Tampermonkey with the script. Click Install and you're done.

**How it works:**

The script targets four pages for most sites:

- Movies Index Page (e.g. [ATK Premium Movies](https://www.atkpremium.com/tour/movies))
  - For most sites, a download button (defaults to HD, but you can replace `_hd` with `_4k` if you believe the video has a 4K version available) is added below the thumbnail.
- Model's Page (e.g. [Cameron Canada - ATK Premium](https://www.atkpremium.com/tour/model/cam027/premium-Cameron-Canada))
  - The script makes the videos downloadable by augmenting the video quality badges (e.g. HD MP4, SD MP4, etc.) These badges are now clickable. You can either click them to start downloading or copy the download URL by right clicking on them.
  - If the page contains photo albums, a download button is added (usually to the right) (e.g. Download 44 Images).
- Model's Video Page (e.g. [Cameron Canada fucks a sex machine](https://www.atkpremium.com/tour/movie/409466/Cameron-Canada-fucks-a-sex-machine.))
  - The script makes the videos downloadable by augmenting the video quality badges (e.g. HD MP4, SD MP4, etc.) These badges are now clickable. You can either click them to start downloading or copy the download URL by right clicking on them.
- Model's Album Page (e.g. [Cameron Canada is a country girl](https://www.atkpremium.com/tour/photo/409615/-Cameron-Canada-is-a-country-girl-who-shows-off-her-birthday-suit))
  - A download button is added at the top to download the album.
