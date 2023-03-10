#!/bin/bash
USERNAME=$1
OUTPUT_FILEPATH=$2

# Generat a contribution graph from github activity
function generateContributionGraph() {
    USERNAME=$1
    OUTPUT_FILEPATH=$2
    ESC=$(printf '\033')
    echo "---Generate a contribution graph from github activity."
    printf "  ---> ${ESC}[36m%s${ESC}[m\n"

    curl https://github.com/$USERNAME | awk '/<svg.+class="js-calendar-graph-svg"/,/svg>/' | sed -e 's/<svg width="717" height="112" class="js-calendar-graph-svg">/<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="717" height="127" class="js-calendar-graph-svg">/g' | sed -e 's/<\/g>  <\/svg>/<text class="ContributionCalendar-label" x="580" y="104">Less<\/text><text class="ContributionCalendar-label" x="675" y="104">More<\/text><rect width="10" height="10" x="608" y="95" class="ContributionCalendar-day" rx="2" ry="2" data-level="0"><\/rect><rect width="10" height="10" x="621" y="95" class="ContributionCalendar-day" rx="2" ry="2" data-level="1"><\/rect><rect width="10" height="10" x="634" y="95" class="ContributionCalendar-day" rx="2" ry="2" data-level="2"><\/rect><rect width="10" height="10" x="647" y="95" class="ContributionCalendar-day" rx="2" ry="2" data-level="3"><\/rect><rect width="10" height="10" x="660" y="95" class="ContributionCalendar-day" rx="2" ry="2" data-level="4"><\/rect><\/g><\/svg>/g' | sed 's/<\/svg>/<style>div.js-calendar-graph{margin-top:1rem;display:flex!important;flex-direction:column!important;align-items:flex-end!important;overflow:hidden!important;margin-right:8px!important;margin-left:8px!important}text{font-family:gill sans,sans-serif;font-size:11px;fill:var(--tw-prose-links)}[data-level="0"]{fill:#eee}[data-level="1"]{fill:#d6e685}[data-level="2"]{fill:#8cc665}[data-level="3"]{fill:#44a340}[data-level="4"]{fill:#1e6823}.dark [data-level="0"]{fill:#2b3234}.dark [data-level="1"]{fill:#1a4e34}.dark [data-level="2"]{fill:#006d32}.dark [data-level="3"]{fill:#26a641}.dark [data-level="4"]{fill:#39d353}.svg-tip{position:absolute;z-index:99999;padding:8px 16px;font-size:11px;text-align:center;border-radius:6px;color:#fff;background:#24292f}.dark .svg-tip{background:#6e7681}.svg-tip:after{position:absolute;bottom:-10px;left:50%;width:5px;height:5px;box-sizing:border-box;margin:0 0 0 -4px;content:" ";border:5px solid transparent;border-top-color:#24292f}.dark .svg-tip:after{border-top-color:#6e7681}.svg-tip.left::after{left:10%}.svg-tip.right::after{left:90%}<\/style><\/svg>/g' > $OUTPUT_FILEPATH
}
generateContributionGraph $USERNAME $OUTPUT_FILEPATH