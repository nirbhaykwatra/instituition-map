let selectedMarker = null;

function initSearch() {
  const searchBox = document.querySelector(".search-input");

  searchBox.addEventListener("keydown", (event) => {
    handleInput(event);
  })
}

function handleInput(event) {
  if (event.key === "Enter") {

  } else {
      return;
  }
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
  });

  const sidebar = document.querySelector(".sidebar");

  for (const school of schools) {
    const SchoolMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(school),
      position: school.position,
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
        <div class="district">${institution.district}</div>
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
    sidebar.innerHTML = ``;
  }
}

const schools = [
  {
    name: "Mountainside Secondary",
    tags: "School",
    type: "school",
    address: "3365 Mahon Avenue North Vancouver BC",
    district: "School District 44",
    requests: ["Request 1", "Request 2"],
    programs: ["Program 1"],
    position: {
      lat: 49.34035303968323,
      lng: -123.08051030146905
    }
  },
  {
    name: "Handsworth Secondary",
    tags: "School",
    type: "school",
    address: "1033 Handsworth Road North Vancouver BC",
    district: "School District 44",
    requests: ["Request 1", "Request 2"],
    programs: ["Program 1"],
    position: {
      lat: 49.35242802064235,
      lng: -123.10137877302783
    }
  },
  {
    name: "Carson Graham Secondary",
    tags: "School",
    type: "school",
    address: "2145 Jones Avenue North Vancouver BC",
    district: "School District 44",
    requests: ["Request 1", "Request 2"],
    programs: ["Program 1"],
    position: {
      lat: 49.329127965950505,
      lng: -123.08180647510146
    }
  },
  {
    name: "Argyle Secondary",
    tags: "School",
    type: "school",
    address: "1131 Frederick Road North Vancouver BC",
    district: "School District 44",
    requests: ["Request 1", "Request 2"],
    programs: ["Program 1"],
    position: {
      lat: 49.3416081277803,
      lng: -123.04200298546256
    }
  }
]

const industryPartners = [
  {
    name: "Elk Valley Resources",
    tags: "Industry Partner",
    type: "industry",
    address: "565 Michel Creek Rd, Sparwood, BC",
    programs: ["Program 1"],
    contact: "Jay Weldon",
    position: {
      lat: 49.743664238353965,
      lng: -114.8768418788194
    }
  },
  {
    name: "BC Wildlife Federation",
    tags: "Industry Partner",
    type: "industry",
    address: "9706 188 St, Surrey, BC",
    programs: ["Program 1"],
    contact: "Arielle Garsson",
    position: {
      lat: 49.178792439098864,
      lng: -122.70057571001746
    }
  },
  {
    name: "Entuitive Consulting",
    tags: "Industry Partner",
    type: "industry",
    address: "1075 W Georgia St Suite 1020, Vancouver, BC",
    programs: ["Program 1"],
    contact: "Juliette Mollard Thibault",
    position: {
      lat: 49.285945657851165,
      lng: -123.12216791846
    }
  },
  {
    name: "Makers Making Change",
    tags: "Industry Partner",
    type: "industry",
    address: "3999 Henning Dr #400, Burnaby, BC",
    programs: ["Program 1"],
    contact: "",
    position: {
      lat: 49.2656145749895,
      lng: -123.01496378746197
    }
  },
  {
    name: "Microsoft",
    tags: "Industry Partner",
    type: "industry",
    address: "725 Granville St Suite 700 Vancouver, BC",
    programs: ["Program 1"],
    contact: "Emma Gray",
    position: {
      lat: 49.282238504262544, 
      lng: -123.11960517823994
    }
  }
]

const postSecondary = [
  {
    name: "Capilano University",
    tags: "Post Secondary",
    type: "postsec",
    address: "2055 Purcell Way, North Vancouver, BC V7J 3H5",
    programs: ["Program 1"],
    position: {
      lat: 49.32095962114928,
      lng: -123.02201144509955
    }
  },
]

initMap();