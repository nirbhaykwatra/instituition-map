let selectedMarker = null;

/*try {
  const response = await fetch('/');
  
  if (response.status === 200) {
    window.location.href = '/';
  } else {
    window.location.href = '/login';
  }
} catch (error) {
  console.error('Failed to load into map page:', error);
}*/

try {
  const response = await fetch('/config');
  const config = await response.json();

  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: config.mapsApiKey,
    v: "weekly",
    loading: "async",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });


  // Now use config.mapsApiKey to load Google Maps
  // You'll need to dynamically create the script tag
} catch (error) {
  console.error('Failed to load configuration:', error);
}

const getSchools = await fetch('/api/schools');
const getIndustryPartners = await fetch('/api/industry');
const getPostSecondary = await fetch('/api/postsec');

const schools = await getSchools.json();
const industryPartners = await getIndustryPartners.json();
const postSecondary = await getPostSecondary.json();

function initSearch() {
  const searchBox = document.querySelector(".search-input");
  searchBox.addEventListener("keydown", (event) => {
    handleInput(event);
  })
}
async function initMap() {

  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const center = { lat: 49.3292264, lng: -123.0726468 };
  const map = new Map(document.getElementById("map"), {
    zoom: 11,
    center,
    mapId: "4504f8b37365c3d0",
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.BLOCK_START_INLINE_CENTER,
    }
  });

  const sidebar = document.querySelector(".sidebar");

  for (const school of schools) {
    const SchoolMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(school),
      position: school.location,
      title: school.name,
    });

    SchoolMarker.addListener("gmp-click", () => {
      if (selectedMarker !== null && selectedMarker !== SchoolMarker) {
        toggleHighlight(selectedMarker);
        selectedMarker = SchoolMarker;
      }
      toggleHighlight(SchoolMarker);
      console.log(`Selected marker: ` + selectedMarker);
      buildSidebar(SchoolMarker, sidebar, school);
    });
  }

  for (const industry of industryPartners) {
    const IndustryMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(industry),
      position: industry.position,
      title: industry.name,
    });

    IndustryMarker.addListener("gmp-click", () => {
      if (selectedMarker !== null && selectedMarker !== IndustryMarker) {
        toggleHighlight(selectedMarker);
        selectedMarker = IndustryMarker;
      }
      toggleHighlight(IndustryMarker);
      buildSidebar(IndustryMarker, sidebar, industry);
    });
  }

  for (const postsec of postSecondary) {
    const PostSecMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(postsec),
      position: postsec.position,
      title: postsec.name,
    });

    PostSecMarker.addListener("gmp-click", () => {
      if (selectedMarker !== null && selectedMarker !== PostSecMarker) {
        toggleHighlight(selectedMarker);
        selectedMarker = PostSecMarker;
      }
      toggleHighlight(PostSecMarker);
      buildSidebar(PostSecMarker, sidebar, postsec);
    });
  }
}
  
function toggleHighlight(markerView) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
    selectedMarker = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
    selectedMarker = markerView;
  }
}

function buildContent(institution) {
  const content = document.createElement("div");

  if (institution.type === "school") {
    content.classList.add("school");
    content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-school" title="school"></i>
        <span class="fa-sr-only">school</span>
    </div>
    <div class="details">
        <div class="name">${institution.name}</div>
        <div class="address">${institution.address}</div>
        <div class="district">District ${institution.district}</div>
    </div>
    `;
    console.log(`Generated content for school markers.`)
    return content;
  }

  if (institution.type === "industry") {
    content.classList.add("industry");
    content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-industry" title="industry"></i>
        <span class="fa-sr-only">industry</span>
    </div>
    <div class="details">
        <div class="name">${institution.name}</div>
        <div class="address">${institution.address}</div>
    </div>
    `;
    console.log(`Generated content for industry markers.`)
    return content;
  }

  if (institution.type === "postsec") {
    content.classList.add("postsec");
    content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-building-columns" title="postsec"></i>
        <span class="fa-sr-only">postsec</span>
    </div>
    <div class="details">
        <div class="name">${institution.name}</div>
        <div class="address">${institution.address}</div>
    </div>
    `;
    console.log(`Generated content for postsec markers.`)
    return content;
  }
}

function buildSidebar(markerView, sidebar, institution) {
  if (markerView.content.classList.contains("highlight")) {

    sidebar.classList.remove("hidden");
    
    switch (institution.tags) {
      case "School":
        sidebar.innerHTML = `
        <div class="sidebar-details">
          <div class="sidebar-header">
            <img class="header-image" src="https://images.actiontourguide.com/wp-content/uploads/2023/12/16114522/Beautiful-aerial-view-of-downtown-Vancouver-skyline.jpg">
            <div class="name">
              <span>${institution.name}</span>
            </div>
            <div class="tags">
              <div class="tag"
                <span>${institution.tags}</span>
              </div>
            </div>
            <div class="address">
              <span>${institution.address}</span>
            </div>
          </div>
        </div>
        `;
        break;

      case "Industry Partner":
        sidebar.innerHTML = `
        <div class="sidebar-details">
          <div class="sidebar-header">
            <img class="header-image" src="https://images.actiontourguide.com/wp-content/uploads/2023/12/16114522/Beautiful-aerial-view-of-downtown-Vancouver-skyline.jpg">
            <div class="name">
              <span>${institution.name}</span>
            </div>
            <div class="tags">
              <div class="tag"
                <span>${institution.tags}</span>
              </div>
            </div>
            <div class="contact">
              <span>Contact: <b>${institution.contact}</b></span>
            </div>
            <div class="address">
              <span>${institution.address}</span>
            </div>
          </div>
        </div>
        `;
        break;

        case "Post Secondary":
          sidebar.innerHTML = `
          <div class="sidebar-details">
            <div class="sidebar-header">
              <img class="header-image" src="https://images.actiontourguide.com/wp-content/uploads/2023/12/16114522/Beautiful-aerial-view-of-downtown-Vancouver-skyline.jpg">
              <div class="name">
                <span>${institution.name}</span>
              </div>
              <div class="tags">
                <div class="tag"
                  <span>${institution.tags}</span>
                </div>
              </div>
              <div class="address">
                <span>${institution.address}</span>
              </div>
            </div>
          </div>
          `;
          break;
    }
  } else {
    sidebar.classList.add("hidden");
    sidebar.innerHTML = ``;
  }
}

initMap();
