/**
 * White Volunteers Foundation - Interactive Engine
 * Powers Chapters Directory, Interactive "Show More" Modals, Video Lightbox,
 * Donation & PhonePe QR Engine, Volunteer Workflows, and Dynamic Animations.
 */

// Force browser to start from the top/beginning on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  initStickyHeader();
  initMobileNav();
  initHeroSlider();
  initCounterAnimation();
  initCampaignSpotlightSlider();
  initChapterDirectory();
  initModals();
  initDonationWidget();
  initNewsletterForm();
  initVideoStreamCarousel();
  initPhotoCarousel();
  initGlobalImageFallbacks();
});

/* ==========================================================================
   1. Sticky Header & Elevation
   ========================================================================== */
function initStickyHeader() {
  // Navigation bar maintains a constant height and styling during scrolling.
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');

  if (!mobileToggle || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Submenu Accordion Toggles
  const subToggles = drawer.querySelectorAll('.mobile-sub-toggle');
  subToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const parent = toggle.closest('.mobile-has-sub');
      if (parent) {
        parent.classList.toggle('open');
      }
    });
  });

  // Close drawer on clicking regular nav links or sub-links
  const drawerLinks = drawer.querySelectorAll('.mobile-nav-link:not(.has-sub), .mobile-sub-menu a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. 5-Image Clean Slideshow Controller (4-Second Auto-Scroll, No Text on Images)
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.showcase-slide, .hero-split-slide, .fullscreen-slide');
  const dots = document.querySelectorAll('.showcase-dot, .split-dot, .slider-dot');
  const prevBtn = document.getElementById('heroSliderPrev') || document.getElementById('heroPrevSlide');
  const nextBtn = document.getElementById('heroSliderNext') || document.getElementById('heroNextSlide');
  const container = document.querySelector('.hero-photo-showcase-section') || document.querySelector('.hero-slideshow-container') || document.querySelector('.hero-fullscreen-slider-section');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 3500); // 3.5-second smooth auto-scroll (3–5s range)
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Arrow Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoPlay();
    });
  }

  // Dot Click Listeners
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoPlay();
    });
  });

  // Pause on Hover
  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  // Touch Swipe Support on Mobile
  if (container) {
    let touchStartX = 0;
    let touchEndX = 0;
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
      startAutoPlay();
    }, { passive: true });
  }

  // Initial setup
  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   4. Impact Counters (Static Immediate Render, No Animation Delays)
   ========================================================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target') || 0;
    const suffix = counter.getAttribute('data-suffix') || '';
    counter.textContent = target.toLocaleString('en-IN') + suffix;
  });
}

/* ==========================================================================
   5. Comprehensive Chapters Directory Data & Filtering
   ========================================================================== */
const chaptersData = [
  {
    id: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    landmark: "Charminar & Hussain Sagar",
    region: "south",
    tag: "Central HQ Hub",
    volunteers: "1,850+",
    beneficiaries: "35,000+",
    coordinator: "Latha Maraveni & Regional Team",
    phone: "+91 91008 94893",
    email: "founderwvfindia@wvfindia.org",
    address: "#10-551, Nagaram, Keesara, Greater Hyderabad, Telangana - 500083",
    initiatives: "School Kit Drives, Daily Nutrition (Nityapalamrutam), School Renovation, Community Connect Internship, Digital Libraries",
    image: "assets/images/hyderabad-charminar.jpg",
    desc: "The central headquarters powering grassroots social transformation, school adoption, and urban donor mobilization across Greater Hyderabad and surrounding districts."
  },
  {
    id: "warangal",
    city: "Warangal",
    state: "Telangana",
    landmark: "Kakatiya Kala Thoranam",
    region: "south",
    tag: "Telangana District Hub",
    volunteers: "620+",
    beneficiaries: "12,500+",
    coordinator: "Rajeshwar Rao",
    phone: "+91 84009 96611",
    email: "warangal@wvfindia.org",
    address: "Hanamkonda Seva Center, Warangal, Telangana - 506001",
    initiatives: "Rural School Renovation, Stationery Kit Drives, Student Skill Development, Women Self-Help Groups",
    image: "assets/images/warangal-landmark.jpg",
    desc: "Deep grassroots outreach across Kakatiya districts focusing on rural student tutoring, school building repairs, and morning nutrition."
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    landmark: "Vidhana Soudha & Tech Corridor",
    region: "south",
    tag: "Tech & CSR Hub",
    volunteers: "2,400+",
    beneficiaries: "42,000+",
    coordinator: "Ramesh K. & Seva Team",
    phone: "+91 91008 94893",
    email: "bengaluru@wvfindia.org",
    address: "Malleshwaram & Electronic City Chapters, Bengaluru, Karnataka - 560003",
    initiatives: "Corporate CSR Volunteering, STEM & Digital Labs in Govt Schools, Weekend Teaching, Educational Material Drives",
    image: "assets/images/bengaluru-landmark.jpg",
    desc: "Mobilizing tech professionals, university students, and corporate partners to teach, mentor, and set up digital learning labs in underserved schools."
  },
  {
    id: "delhi",
    city: "Delhi-NCR",
    state: "National Capital Region",
    landmark: "India Gate & Red Fort",
    region: "north",
    tag: "Capital Chapter",
    volunteers: "1,200+",
    beneficiaries: "28,000+",
    coordinator: "Vikram Sharma",
    phone: "+91 91008 94893",
    email: "delhi@wvfindia.org",
    address: "Connaught Place & Rohini Centers, New Delhi - 110001",
    initiatives: "Slum School Learning Support, Winter Clothes Drives, Student Career Mentoring, Digital Education",
    image: "assets/images/delhi-landmark.jpg",
    desc: "Serving vulnerable youth and migrant families across Delhi, Noida, and Gurugram with regular educational supplies and nutritional support."
  },
  {
    id: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    landmark: "Gateway of India & Sea Link",
    region: "west",
    tag: "Metro Chapter",
    volunteers: "1,500+",
    beneficiaries: "31,000+",
    coordinator: "Pooja Deshmukh",
    phone: "+91 91008 94893",
    email: "mumbai@wvfindia.org",
    address: "Dadar West, Mumbai, Maharashtra - 400028",
    initiatives: "Slum School Adoption, Youth Digital Skills, Nutrition Drives, School Bag Distribution",
    image: "assets/images/mumbai-landmark.jpg",
    desc: "Empowering underserved urban slum youth and coastal municipal schools with essential educational kits, weekend tutoring, and youth seva."
  },
  {
    id: "kolkata",
    city: "Kolkata",
    state: "West Bengal",
    landmark: "Howrah Bridge & Victoria Memorial",
    region: "east",
    tag: "Eastern Hub",
    volunteers: "1,050+",
    beneficiaries: "24,000+",
    coordinator: "Sourav Ganguly & Seva Team",
    phone: "+91 91008 94893",
    email: "kolkata@wvfindia.org",
    address: "Salt Lake Sector V, Kolkata, West Bengal - 700091",
    initiatives: "Evening Study Circles, Joy of Giving Drives, Youth Literary Support, School Renovation",
    image: "assets/images/kolkata-landmark.jpg",
    desc: "Igniting community spirit through student-led evening study hubs, stationery kit distribution, and educational material drives in underprivileged wards."
  },
  {
    id: "visakhapatnam",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    landmark: "RK Beach & Dolphin's Nose",
    region: "south",
    tag: "Coastal Chapter",
    volunteers: "780+",
    beneficiaries: "14,200+",
    coordinator: "Srinivas Murthy",
    phone: "+91 91008 94893",
    email: "vizag@wvfindia.org",
    address: "MVP Colony, Visakhapatnam, Andhra Pradesh - 530017",
    initiatives: "Coastal Village School Support, Youth Skill Camps, Disaster Preparedness, Tree Plantation",
    image: "assets/images/vizag-landmark.jpg",
    desc: "Empowering coastal and tribal belt youth through environmental conservation, career guidance, and school learning kits."
  },
  {
    id: "ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    landmark: "Sabarmati Riverfront & Ashram",
    region: "west",
    tag: "Active Chapter",
    volunteers: "850+",
    beneficiaries: "16,000+",
    coordinator: "Bhavin Patel",
    phone: "+91 91008 94893",
    email: "ahmedabad@wvfindia.org",
    address: "Navrangpura Community Center, Ahmedabad, Gujarat - 380009",
    initiatives: "Child Nutrition Support, Spoken English & Digital Skills, Stationery Drives, Youth Leadership",
    image: "assets/images/school-children-classroom-collage.jpg",
    desc: "Engaging university students and grassroots leaders to provide free tutoring support, stationery supplies, and skill development."
  },
  {
    id: "nalgonda",
    city: "Nalgonda",
    state: "Telangana",
    landmark: "Bhongir & Devarakonda Forts",
    region: "south",
    tag: "Telangana District Hub",
    volunteers: "410+",
    beneficiaries: "8,900+",
    coordinator: "Venkat Reddy",
    phone: "+91 84009 96611",
    email: "nalgonda@wvfindia.org",
    address: "Clock Tower Center, Nalgonda, Telangana - 508001",
    initiatives: "Clean Drinking Water Projects, Rural School Adoption, Notebook Distribution, Women Empowerment",
    image: "assets/images/classroom-distribution-1.jpg",
    desc: "Tackling regional challenges, providing safe drinking water systems in schools, and strengthening rural primary education."
  },
  {
    id: "bhubaneswar",
    city: "Bhubaneswar",
    state: "Odisha",
    landmark: "Konark Sun Temple & Lingaraj",
    region: "east",
    tag: "Eastern Chapter",
    volunteers: "690+",
    beneficiaries: "13,800+",
    coordinator: "Debashis Mohapatra",
    phone: "+91 91008 94893",
    email: "bhubaneswar@wvfindia.org",
    address: "Saheed Nagar, Bhubaneswar, Odisha - 751007",
    initiatives: "Rural Education Fellowship, Health & Hygiene Awareness, Stationery Kits",
    image: "assets/images/happy-students-thumbs-up.jpg",
    desc: "Bridging the educational opportunity divide in Odisha with comprehensive youth volunteering and rural classroom development."
  },
  {
    id: "bihar",
    city: "Patna (Bihar)",
    state: "Bihar",
    landmark: "Golghar & Ancient Nalanda",
    region: "east",
    tag: "Growth Chapter",
    volunteers: "940+",
    beneficiaries: "22,000+",
    coordinator: "Alok Kumar Singh",
    phone: "+91 91008 94893",
    email: "bihar@wvfindia.org",
    address: "Kankarbagh, Patna, Bihar - 800020",
    initiatives: "Evening Study Centers, NMMS Scholarship Guidance, School Uniform & Kit Drives",
    image: "assets/images/classroom-notebooks-students.jpg",
    desc: "Transforming government school educational outcomes and creating scholarship pathways for talented underprivileged rural children."
  },
  {
    id: "chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    landmark: "Marina Beach & Central Heritage",
    region: "south",
    tag: "Metropolitan Hub",
    volunteers: "1,150+",
    beneficiaries: "21,000+",
    coordinator: "Karthik Subramanian",
    phone: "+91 91008 94893",
    email: "chennai@wvfindia.org",
    address: "T. Nagar, Chennai, Tamil Nadu - 600017",
    initiatives: "Youth Tech Literacy, School Renovation, Nutrition Support, Coastal Welfare",
    image: "assets/images/volunteer-students-classroom-selfie.jpg",
    desc: "A vibrant network of college students and corporate professionals dedicated to weekend school seva and child welfare."
  }
];

function initChapterDirectory() {
  const container = document.getElementById('chaptersGrid');
  const searchInput = document.getElementById('chapterSearch');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const resultCount = document.getElementById('chapterResultCount');

  if (!container) return;

  let activeRegion = 'all';
  let searchTerm = '';

  function renderChapters() {
    container.innerHTML = '';
    const filtered = chaptersData.filter(ch => {
      const matchesRegion = activeRegion === 'all' || ch.region === activeRegion;
      const matchesSearch = ch.city.toLowerCase().includes(searchTerm) ||
                            ch.state.toLowerCase().includes(searchTerm) ||
                            ch.initiatives.toLowerCase().includes(searchTerm);
      return matchesRegion && matchesSearch;
    });

    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} active chapter${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: #fff; border-radius: 16px; border: 1px dashed #ccc;">
          <i class="fas fa-map-marker-slash" style="font-size: 3rem; color: #aaa; margin-bottom: 1rem;"></i>
          <h3 style="color: var(--secondary); margin-bottom: 8px;">No Chapters Found</h3>
          <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 1.5rem;">We couldn't find any chapter matching "${searchTerm}". Would you like to start a chapter in your city?</p>
          <button class="btn btn-primary" onclick="openVolunteerModal('Start a Chapter in my city')"><i class="fas fa-plus-circle"></i> Start Chapter in Your City</button>
        </div>
      `;
      return;
    }

    filtered.forEach(chapter => {
      const card = document.createElement('div');
      card.className = 'chapter-card';
      card.innerHTML = `
        <div class="chapter-img-wrapper">
          <img src="${chapter.image}" alt="${chapter.city} - White Volunteers Foundation" class="chapter-img" loading="lazy" onerror="this.src='assets/images/classroom-notebooks-students.jpg'">
        </div>
        <div class="chapter-body">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <h3 class="chapter-city" style="margin: 0; font-size: 1.25rem;">${chapter.city}</h3>
            <span class="badge" style="background: var(--primary-light); color: var(--primary); font-size: 0.72rem; font-weight: 700;">${chapter.tag}</span>
          </div>
          <div class="chapter-state" style="font-size: 0.88rem; color: var(--secondary); font-weight: 600; margin-bottom: 8px;">
            <i class="fas fa-map-pin" style="color: var(--primary);"></i> ${chapter.state}
          </div>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.55;">${chapter.desc.substring(0, 115)}...</p>
          <div class="chapter-stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; background: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.82rem;">
            <div><strong style="color: var(--primary); font-size: 1rem;">${chapter.volunteers}</strong><br><span style="color: var(--text-muted);">Volunteers</span></div>
            <div><strong style="color: var(--accent); font-size: 1rem;">${chapter.beneficiaries}</strong><br><span style="color: var(--text-muted);">Beneficiaries</span></div>
          </div>
          <div style="display: flex; gap: 8px; margin-top: auto;">
            <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="openChapterModal('${chapter.id}')">
              View Details
            </button>
            <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="openVolunteerModal('Volunteer at ${chapter.city} Chapter')">
              <i class="fas fa-user-plus"></i> Join Seva
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeRegion = tab.getAttribute('data-region') || 'all';
      renderChapters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderChapters();
    });
  }

  renderChapters();
}

/* ==========================================================================
   6. Comprehensive Interactive Modal Engine
   ========================================================================== */
function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });

    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeAllModals);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });

  // Stop video playback when video modal closes
  const videoWrap = document.getElementById('videoPlayerWrap');
  if (videoWrap) {
    videoWrap.innerHTML = '';
  }

  document.body.style.overflow = '';
}

// 6.1 Direct Navigation Routing (Eliminating Artificial Popups)
window.openDetailsModal = function(type) {
  if (type === 'milestones' || type === 'story') {
    window.location.href = 'about.html#story';
  } else if (type === 'vision' || type === 'mission') {
    window.location.href = 'about.html#vision-mission';
  } else if (type === 'volunteers') {
    window.location.href = 'volunteer.html';
  } else if (type === 'ceo-message') {
    window.location.href = 'about.html#leadership-note';
  } else if (type === 'internship') {
    window.location.href = 'volunteer.html#internship';
  } else if (type === 'toi-press') {
    window.open('https://timesofindia.indiatimes.com/city/hyderabad/officers-initiative-provides-nutrition-to-3k-students/amp_articleshow/116662040.cms', '_blank');
  } else if (type === 'sakshi-press') {
    window.open('https://www.sakshi.com/telugu-news/family/start-school-breakfast-latha-maraveni-latha-maraveni-1443149', '_blank');
  } else {
    window.location.href = 'about.html';
  }
};

// 6.2 Project Details Modal for the 5 Flagship Projects
const projectsData = {
  1: {
    num: "Project 01",
    title: "1. School Renovation & Infrastructure Development",
    subtitle: "Safe, Clean, and Inspiring Learning Spaces in Govt Schools",
    image: "assets/images/classroom-distribution-1.jpg",
    desc: "We work directly to improve the physical learning environment in Government Schools so children have access to dignified, safe, and child-friendly educational spaces.",
    initiatives: [
      "School building structural maintenance & waterproofing",
      "Classroom wall painting, blackboard restoration & beautification",
      "Safe drinking water filtration systems installation",
      "Sanitation facility overhaul and girl-child hygiene support",
      "Dual-desks, benches, teacher tables, and storage equipment",
      "Activity rooms, green campus plantation, and sports corners"
    ],
    impact: "Over 50+ government schools renovated with child-friendly educational environments across Telangana.",
    volunteerRole: "Classroom wall painting, weekend cleaning drives, plumbing/infra audits, and setting up libraries.",
    donateAction: "School Renovation Drive"
  },
  2: {
    num: "Project 02",
    title: "2. School Kids Stationery & Learning Materials Distribution",
    subtitle: "Ensuring No Child Drops Out Due to Lack of Basic Supplies",
    image: "assets/images/classroom-notebooks-students.jpg",
    desc: "Many children studying in government schools come from families who struggle to afford basic educational supplies. Our distribution drives equip students with everything they need for a full academic year.",
    initiatives: [
      "Custom printed ruled & unruled notebooks and long books",
      "Durable water-resistant school backpacks",
      "Stationery kits (pens, pencils, erasers, sharpeners, geometry boxes, scales)",
      "School uniforms and shoes for impoverished children",
      "Drawing kits, crayons, and creative learning charts"
    ],
    impact: "12,500+ school kits distributed across 500+ government schools. Special campaign currently raising ₹1,00,000 for 500 children (₹200/child).",
    volunteerRole: "Kit packaging, logistics, on-ground distribution, and verifying student beneficiary lists.",
    donateAction: "Sponsor School Kits (₹200/Child)"
  },
  3: {
    num: "Project 03",
    title: "3. Skill Development for Government School Students",
    subtitle: "Practical Life Skills, Digital Literacy & Fearless 40 CRT",
    image: "assets/images/happy-students-thumbs-up.jpg",
    desc: "Education becomes transformative when students also develop practical skills for their future. We conduct mentorship sessions covering computer skills, public speaking, financial literacy, and career awareness.",
    initiatives: [
      "Basic computer literacy & digital problem solving",
      "Spoken English, communication, and public speaking confidence",
      "Career awareness, NMMS scholarship coaching, and higher education guidance",
      "Basic financial literacy and money management principles",
      "Fearless 40 CRT (Campus Recruitment Training, Aptitude & Soft Skills)",
      "Vocational and entrepreneurial exposure workshops"
    ],
    impact: "3,500+ high school and college students trained in career readiness and digital literacy.",
    volunteerRole: "Weekend teaching, conducting mock interviews, computer basics training, and mentoring.",
    donateAction: "Student Skill Development"
  },
  4: {
    num: "Project 04",
    title: "4. Digital Library in Government Schools",
    subtitle: "Bridging the Digital Divide with Smart Learning Pods",
    image: "assets/images/classroom-volunteers-students.jpg",
    desc: "Bringing digital learning technology and curated e-learning content directly to government school classrooms so rural students have equal access to 21st-century knowledge.",
    initiatives: [
      "Donation of desktop computers, tablets, and interactive screens",
      "Curated digital syllabus, e-books, and educational multimedia",
      "Offline and online interactive learning software",
      "Digital literacy classes for primary and high school students",
      "Teacher digital training and classroom smart tools support"
    ],
    impact: "15+ digital learning labs established with thousands of digital hours completed.",
    volunteerRole: "Setting up computer hardware, teaching computer basics, and managing digital library modules.",
    donateAction: "Support Digital Libraries"
  },
  5: {
    num: "Project 05",
    title: "5. Women Empowerment & Livelihood Training",
    subtitle: "Skill Training, Financial Independence & Self-Help Support",
    image: "assets/images/volunteer-school-children-outdoors.jpg",
    desc: "Strong communities are built when women have access to skills, economic independence, and self-confidence. Our programs provide vocational training and livelihood guidance for rural and urban women.",
    initiatives: [
      "Vocational skill training (tailoring, embroidery, handicrafts, food processing)",
      "Digital & smartphone literacy for small business management",
      "Financial literacy, banking, savings, and government scheme awareness",
      "Support for Self-Help Groups (SHGs) and micro-entrepreneurship",
      "Health, nutrition, and menstrual hygiene awareness drives"
    ],
    impact: "1,200+ women trained in income-generating vocational skills across Telangana.",
    volunteerRole: "Conducting financial literacy workshops, training in crafts/digital tools, and health awareness.",
    donateAction: "Support Women Empowerment"
  }
};

window.openProjectModal = function(projectId) {
  closeAllModals();
  const project = projectsData[projectId];
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const title = document.getElementById('projectModalTitle');
  const body = document.getElementById('projectModalBody');
  const footer = document.getElementById('projectModalFooter');

  if (!modal || !title || !body) return;

  title.innerHTML = `<i class="fas fa-layer-group" style="color: var(--primary);"></i> ${project.title}`;
  body.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 14px; box-shadow: var(--shadow-md); margin-bottom: 15px;">
      <span class="badge" style="background: var(--primary-light); color: var(--primary); font-weight: 700; margin-bottom: 8px;">${project.num}</span>
      <h3 style="color: var(--secondary); font-size: 1.45rem; margin-bottom: 8px;">${project.subtitle}</h3>
      <p style="font-size: 0.98rem; line-height: 1.65; color: var(--text-main);">${project.desc}</p>
    </div>

    <div style="background: var(--bg-warm); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
      <h4 style="color: var(--secondary); margin-bottom: 10px;"><i class="fas fa-tasks" style="color: var(--primary);"></i> Key Implementation Areas:</h4>
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem;">
        ${project.initiatives.map(item => `<li><i class="fas fa-check-circle" style="color: #10b981; margin-right: 8px;"></i> ${item}</li>`).join('')}
      </ul>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 10px;">
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px; border-radius: 10px;">
        <strong style="color: #15803d; font-size: 0.9rem;"><i class="fas fa-chart-line"></i> Measurable Impact:</strong>
        <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: #1e293b;">${project.impact}</p>
      </div>
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 14px; border-radius: 10px;">
        <strong style="color: #1d4ed8; font-size: 0.9rem;"><i class="fas fa-user-plus"></i> Volunteer Opportunities:</strong>
        <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: #1e293b;">${project.volunteerRole}</p>
      </div>
    </div>
  `;

  if (footer) {
    footer.innerHTML = `
      <button class="btn btn-outline" onclick="closeAllModals()">Close</button>
      <a href="donate.html" class="btn btn-primary" onclick="closeAllModals()"><i class="fas fa-donate"></i> Sponsor Project</a>
      <button class="btn btn-primary" style="background: #16a34a; border-color: #16a34a;" onclick="openVolunteerModal('${project.title}')"><i class="fas fa-user-plus"></i> Volunteer for this Project</button>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// 6.3 Chapter Details Modal
window.openChapterModal = function(chapterId) {
  closeAllModals();
  const chapter = chaptersData.find(c => c.id === chapterId) || chaptersData[0];
  if (!chapter) return;

  const modal = document.getElementById('chapterModal');
  const title = document.getElementById('chapterModalTitle');
  const body = document.getElementById('chapterModalBody');
  const footer = document.getElementById('chapterModalFooter');

  if (!modal || !title || !body) return;

  title.innerHTML = `<i class="fas fa-city" style="color: var(--primary);"></i> ${chapter.city} Chapter — White Volunteers Foundation`;
  body.innerHTML = `
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; align-items: center;">
      <div style="flex: 1; min-width: 240px;">
        <img src="${chapter.image}" alt="${chapter.city}" style="width: 100%; height: 190px; object-fit: cover; border-radius: 12px; box-shadow: var(--shadow-sm);" onerror="this.src='assets/images/classroom-notebooks-students.jpg'">
      </div>
      <div style="flex: 1.4; min-width: 260px;">
        <span class="badge" style="background: var(--primary-light); color: var(--primary); font-weight: 700; margin-bottom: 6px;">${chapter.tag} • ${chapter.state}</span>
        <h3 style="margin-bottom: 0.5rem; color: var(--secondary);">${chapter.city} Chapter</h3>
        <p style="font-size: 0.92rem; margin-bottom: 0.75rem; color: var(--text-main); line-height: 1.6;">${chapter.desc}</p>
        <div style="background: var(--bg-warm); padding: 0.8rem 1rem; border-radius: 10px; font-size: 0.88rem; display: flex; gap: 20px;">
          <div><strong>Active Volunteers:</strong> <span style="color: var(--primary); font-weight: 700;">${chapter.volunteers}</span></div>
          <div><strong>Lives Touched:</strong> <span style="color: var(--accent); font-weight: 700;">${chapter.beneficiaries}</span></div>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-bottom: 1.25rem;">
      <h4 style="margin-bottom: 0.6rem; color: var(--secondary);"><i class="fas fa-hand-holding-heart" style="color: var(--primary);"></i> Key Ongoing Initiatives:</h4>
      <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">${chapter.initiatives}</p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.2rem; margin-bottom: 1rem;">
      <h4 style="margin-bottom: 0.8rem; color: var(--primary);"><i class="fas fa-id-badge"></i> Chapter Coordinator & Secretariat:</h4>
      <p style="margin-bottom: 0.35rem; font-size: 0.9rem;"><strong>Lead Coordinator:</strong> ${chapter.coordinator}</p>
      <p style="margin-bottom: 0.35rem; font-size: 0.9rem;"><strong>Direct Helpline:</strong> <a href="tel:${chapter.phone.replace(/\s+/g, '')}" style="color: var(--primary); font-weight: 700;">${chapter.phone}</a></p>
      <p style="margin-bottom: 0.35rem; font-size: 0.9rem;"><strong>Email:</strong> <a href="mailto:${chapter.email}" style="color: var(--primary);">${chapter.email}</a></p>
      <p style="margin-bottom: 0; font-size: 0.9rem;"><strong>Office Address:</strong> ${chapter.address}</p>
    </div>
  `;

  if (footer) {
    footer.innerHTML = `
      <button class="btn btn-outline" onclick="closeAllModals()">Close</button>
      <button class="btn btn-primary" onclick="openVolunteerModal('Volunteer at ${chapter.city} Chapter')"><i class="fas fa-user-plus"></i> Join ${chapter.city} Chapter</button>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// 6.4 Video Lightbox Modal (Plays YouTube Video Directly Inside Page)
window.openVideoModal = function(videoId, title = 'Ground Action Documentary', channel = 'White Volunteers Foundation') {
  closeAllModals();
  const modal = document.getElementById('videoModal');
  const titleEl = document.getElementById('videoModalTitle');
  const wrapEl = document.getElementById('videoPlayerWrap');
  const descEl = document.getElementById('videoModalDesc');
  const directLink = document.getElementById('videoModalDirectLink');

  if (!modal || !wrapEl) return;

  if (titleEl) {
    titleEl.innerHTML = `<i class="fab fa-youtube" style="color: #ff0000;"></i> ${title}`;
  }

  if (descEl) {
    descEl.textContent = `Featured documentary by ${channel}. Showcasing grassroots educational and nutrition initiatives across Telangana.`;
  }

  if (directLink) {
    directLink.href = `https://www.youtube.com/watch?v=${videoId}`;
  }

  // Embed clean responsive iframe with autoplay
  wrapEl.innerHTML = `
    <iframe 
      src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
      title="${title}" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// 6.5 Full Pure Poster Lightbox (Clean Display, Only Poster, Zero Text Blocks)
window.openPosterModal = function(imageSrc, title = 'Campaign Poster') {
  closeAllModals();
  const modal = document.getElementById('posterModal');
  const imgEl = document.getElementById('posterModalImg');
  const actionsEl = document.getElementById('posterModalActions');

  if (!modal) return;

  if (imgEl) {
    imgEl.src = imageSrc;
    imgEl.alt = title || 'Official Poster';
  }

  if (actionsEl) {
    actionsEl.innerHTML = `
      <a href="${imageSrc}" download="${(title || 'white_volunteers_poster').replace(/[^a-zA-Z0-9]/g, '_')}.jpg" class="poster-lightbox-download-btn">
        <i class="fas fa-download"></i> Download Poster
      </a>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// 6.6 Volunteer Registration Modal
window.openVolunteerModal = function(initiativeName = '') {
  closeAllModals();
  const modal = document.getElementById('volunteerModal');
  const programInput = document.getElementById('volunteerProgram');
  const interestSelect = document.getElementById('volDomain');

  if (!modal) return;

  if (programInput) {
    programInput.value = initiativeName || 'General Volunteering';
  }

  if (interestSelect && initiativeName) {
    // Attempt auto-match in dropdown
    const options = Array.from(interestSelect.options);
    const match = options.find(opt => initiativeName.toLowerCase().includes(opt.value.toLowerCase()) || opt.text.toLowerCase().includes(initiativeName.toLowerCase()));
    if (match) {
      interestSelect.value = match.value;
    }
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// 6.7 Donation & PhonePe QR Modal
window.openDonateModal = function(presetAmount = 1000, cause = 'Education & Nutrition') {
  closeAllModals();
  const modal = document.getElementById('donateModal');
  const amountInput = document.getElementById('modalDonationAmount');
  const causeEl = document.getElementById('donateModalCause');

  if (!modal) return;

  if (amountInput) {
    amountInput.value = presetAmount;
  }

  if (causeEl) {
    causeEl.textContent = cause;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

/* ==========================================================================
   7. Donation Widget & Amount Selector
   ========================================================================== */
function initDonationWidget() {
  const donationBtns = document.querySelectorAll('.donation-btn');
  const amountInput = document.getElementById('donationAmount');
  const modalAmountInput = document.getElementById('modalDonationAmount');

  donationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      donationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const amt = btn.getAttribute('data-amount');
      if (amt !== 'custom') {
        if (amountInput) amountInput.value = amt;
        if (modalAmountInput) modalAmountInput.value = amt;
      } else {
        if (amountInput) amountInput.focus();
        if (modalAmountInput) modalAmountInput.focus();
      }
    });
  });

  // QR Code Tab Switchers
  const qrTabs = document.querySelectorAll('.qr-tab');
  qrTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.payment-card') || document;
      parent.querySelectorAll('.qr-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');
      parent.querySelectorAll('.qr-container').forEach(c => c.classList.remove('active'));
      const activeQr = parent.querySelector(`#${target}-qr`);
      if (activeQr) activeQr.classList.add('active');
    });
  });
}

// Copy UPI / Account Text Helper with Toast Feedback
window.copyToClipboard = function(text, label = 'Information') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard: ${text}`, 'success');
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
};

function fallbackCopy(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`${label} copied: ${text}`, 'success');
  } catch (err) {
    showToast(`${label}: ${text}`, 'info');
  }
  document.body.removeChild(textArea);
}

/* ==========================================================================
   8. Form Handlers & Toast Notifications
   ========================================================================== */
window.handleVolunteerSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('volName')?.value || document.getElementById('regName')?.value || 'Volunteer';
  const phone = document.getElementById('volPhone')?.value || document.getElementById('regPhone')?.value || '';
  const city = document.getElementById('volCity')?.value || document.getElementById('regCity')?.value || 'Hyderabad';
  const track = document.getElementById('volDomain')?.value || document.getElementById('regInterest')?.value || 'Social Impact';

  showToast(`Thank you, ${name}! Your registration for ${track} (${city}) has been recorded. Our coordinator will contact you at ${phone}.`, 'success');
  closeAllModals();
  e.target.reset();
};

window.handleContactSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('cName')?.value || 'Friend';
  showToast(`Thank you, ${name}! Your message has been transmitted to White Volunteers Foundation HQ. We will reply shortly.`, 'success');
  e.target.reset();
};

function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Subscribed! Quarterly foundation bulletins will be sent to ${input.value}`, 'success');
        input.value = '';
      }
    });
  });
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}" style="color: ${type === 'success' ? '#10b981' : 'var(--primary)'}; font-size: 1.2rem;"></i>
    <span style="flex: 1; font-weight: 500;">${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/* ==========================================================================
   9. Video Stream Carousel (Seamless Continuous Flow Chain Ticker)
   ========================================================================== */
function initVideoStreamCarousel() {
  const containers = document.querySelectorAll('.video-carousel-container');
  if (containers.length === 0) return;

  containers.forEach(container => {
    const track = container.querySelector('.video-carousel-track');
    if (!track) return;

    track.style.animation = 'none';

    let initialCards = Array.from(track.children);
    if (initialCards.length === 0) return;

    const sectionWrap = container.closest('.video-stream-section-wrap') || container;
    const prevBtn = sectionWrap.querySelector('.video-prev-btn');
    const nextBtn = sectionWrap.querySelector('.video-next-btn');
    const dotsContainer = sectionWrap.querySelector('.video-carousel-dots');

    const uniqueCards = initialCards.filter(c => !c.classList.contains('is-clone'));
    const originalCount = uniqueCards.length;

    // Clone initial cards to create a seamless infinite chain loop
    if (!container.getAttribute('data-infinite-initialized')) {
      container.setAttribute('data-infinite-initialized', 'true');
      if (initialCards.length === originalCount) {
        uniqueCards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.classList.add('is-clone');
          track.appendChild(clone);
        });
      }
    }

    let currentPos = 0;
    let isPaused = false;
    let animFrame = null;
    const speed = 0.85; // smooth 60fps pixel stream speed

    function getHalfWidth() {
      const allCards = track.children;
      let totalWidth = 0;
      for (let i = 0; i < originalCount; i++) {
        if (!allCards[i]) break;
        const rect = allCards[i].getBoundingClientRect();
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 24;
        totalWidth += (rect.width + gap);
      }
      return totalWidth || 2000;
    }

    function updateDots() {
      if (!dotsContainer) return;
      if (dotsContainer.children.length !== originalCount) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < originalCount; i++) {
          const dot = document.createElement('span');
          dot.className = `video-dot ${i === 0 ? 'active' : ''}`;
          dot.setAttribute('title', `Video Slide ${i + 1}`);
          dotsContainer.appendChild(dot);
        }
      }

      const halfWidth = getHalfWidth();
      const cardWidth = halfWidth / originalCount;
      const activeIdx = Math.floor((currentPos / cardWidth) % originalCount);

      const dots = dotsContainer.querySelectorAll('.video-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    }

    function animateContinuous() {
      if (!isPaused) {
        currentPos += speed;
        const halfWidth = getHalfWidth();
        if (halfWidth > 0 && currentPos >= halfWidth) {
          currentPos = currentPos % halfWidth;
        }
        track.style.transform = `translateX(${-currentPos}px)`;
        updateDots();
      }
      animFrame = requestAnimationFrame(animateContinuous);
    }

    // Mouse Hover Pause / Resume
    sectionWrap.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    sectionWrap.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Touch / Drag
    let touchStartX = 0;
    let touchStartPos = 0;

    container.addEventListener('touchstart', (e) => {
      isPaused = true;
      touchStartX = e.changedTouches[0].clientX;
      touchStartPos = currentPos;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      currentPos = touchStartPos + diff;
      const halfWidth = getHalfWidth();
      if (halfWidth > 0) {
        currentPos = ((currentPos % halfWidth) + halfWidth) % halfWidth;
      }
      track.style.transform = `translateX(${-currentPos}px)`;
      updateDots();
    }, { passive: true });

    container.addEventListener('touchend', () => {
      isPaused = false;
    }, { passive: true });

    // Buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const halfWidth = getHalfWidth();
        const cardWidth = halfWidth / originalCount || 320;
        currentPos += cardWidth;
        if (halfWidth > 0 && currentPos >= halfWidth) {
          currentPos = currentPos % halfWidth;
        }
        track.style.transform = `translateX(${-currentPos}px)`;
        updateDots();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const halfWidth = getHalfWidth();
        const cardWidth = halfWidth / originalCount || 320;
        currentPos -= cardWidth;
        if (halfWidth > 0) {
          currentPos = ((currentPos % halfWidth) + halfWidth) % halfWidth;
        }
        track.style.transform = `translateX(${-currentPos}px)`;
        updateDots();
      });
    }

    if (animFrame) cancelAnimationFrame(animFrame);
    animateContinuous();
  });
}

/* ==========================================================================
   9b. Interactive Photo Carousel (Seamless Continuous Flow Chain Ticker)
   ========================================================================== */
function initPhotoCarousel() {
  const sections = document.querySelectorAll('.infinite-photo-strip-section, #mediaPhotoCarouselSection');
  if (sections.length === 0) return;

  sections.forEach(sectionContainer => {
    const parentWrap = sectionContainer.closest('.video-stream-section-wrap') || sectionContainer;
    const track = sectionContainer.querySelector('.infinite-photo-track, .video-carousel-track');
    if (!track) return;

    // Ensure CSS animation doesn't fight JS continuous motion
    track.style.animation = 'none';

    let initialCards = Array.from(track.children);
    if (initialCards.length === 0) return;

    const prevBtn = parentWrap.querySelector('.photo-prev-btn') || parentWrap.querySelector('#photoPrevBtn') || parentWrap.querySelector('#mediaPhotoPrev');
    const nextBtn = parentWrap.querySelector('.photo-next-btn') || parentWrap.querySelector('#photoNextBtn') || parentWrap.querySelector('#mediaPhotoNext');
    const dotsContainer = parentWrap.querySelector('.photo-carousel-dots') || parentWrap.querySelector('#photoDots') || parentWrap.querySelector('#mediaPhotoDots');

    const uniqueCards = initialCards.filter(c => !c.classList.contains('is-clone'));
    const originalCount = uniqueCards.length;

    // Clone cards for continuous infinite chain loop
    if (!sectionContainer.getAttribute('data-infinite-initialized')) {
      sectionContainer.setAttribute('data-infinite-initialized', 'true');
      if (initialCards.length === originalCount) {
        uniqueCards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.classList.add('is-clone');
          track.appendChild(clone);
        });
      }
    }

    let currentPos = 0;
    let isPaused = false;
    let animFrame = null;
    const speed = 0.85; // smooth pixels per frame continuous flow

    function getHalfWidth() {
      const allCards = track.children;
      let totalWidth = 0;
      for (let i = 0; i < originalCount; i++) {
        if (!allCards[i]) break;
        const rect = allCards[i].getBoundingClientRect();
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 20;
        totalWidth += (rect.width + gap);
      }
      return totalWidth || 3000;
    }

    function updateDots() {
      if (!dotsContainer) return;
      const numDots = Math.min(8, originalCount);
      if (dotsContainer.children.length !== numDots) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < numDots; i++) {
          const dot = document.createElement('span');
          dot.className = `photo-dot ${i === 0 ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Slide ${i + 1}`);
          dotsContainer.appendChild(dot);
        }
      }

      const halfWidth = getHalfWidth();
      const cardWidth = halfWidth / originalCount;
      const activeIdx = Math.floor((currentPos / cardWidth) % originalCount);

      const dots = dotsContainer.querySelectorAll('.photo-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    }

    function animateContinuous() {
      if (!isPaused) {
        currentPos += speed;
        const halfWidth = getHalfWidth();
        if (halfWidth > 0 && currentPos >= halfWidth) {
          currentPos = currentPos % halfWidth;
        }
        track.style.transform = `translateX(${-currentPos}px)`;
        updateDots();
      }
      animFrame = requestAnimationFrame(animateContinuous);
    }

    // Hover Pause / Resume handlers
    parentWrap.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    parentWrap.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Touch / Swipe Drag
    let touchStartX = 0;
    let touchStartPos = 0;

    sectionContainer.addEventListener('touchstart', (e) => {
      isPaused = true;
      touchStartX = e.changedTouches[0].clientX;
      touchStartPos = currentPos;
    }, { passive: true });

    sectionContainer.addEventListener('touchmove', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      currentPos = touchStartPos + diff;
      const halfWidth = getHalfWidth();
      if (halfWidth > 0) {
        currentPos = ((currentPos % halfWidth) + halfWidth) % halfWidth;
      }
      track.style.transform = `translateX(${-currentPos}px)`;
      updateDots();
    }, { passive: true });

    sectionContainer.addEventListener('touchend', () => {
      isPaused = false;
    }, { passive: true });

    // Side Navigation Arrows
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const halfWidth = getHalfWidth();
        const cardWidth = halfWidth / originalCount || 260;
        currentPos += cardWidth;
        if (halfWidth > 0 && currentPos >= halfWidth) {
          currentPos = currentPos % halfWidth;
        }
        track.style.transform = `translateX(${-currentPos}px)`;
        updateDots();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const halfWidth = getHalfWidth();
        const cardWidth = halfWidth / originalCount || 260;
        currentPos -= cardWidth;
        if (halfWidth > 0) {
          currentPos = ((currentPos % halfWidth) + halfWidth) % halfWidth;
        }
        track.style.transform = `translateX(${-currentPos}px)`;
        updateDots();
      });
    }

    // Start 60fps continuous animation
    if (animFrame) cancelAnimationFrame(animFrame);
    animateContinuous();
  });
}

/* ==========================================================================
   10. Image Fallback Safety
   ========================================================================== */
function initGlobalImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (!this.getAttribute('data-fallback-applied')) {
        this.setAttribute('data-fallback-applied', 'true');
        this.src = 'assets/images/classroom-notebooks-students.jpg';
      }
    });
  });
}

/* ==========================================================================
   11. Editorial Campaign Spotlight Slider (4s Auto-Scrolling & Alternating Layout)
   ========================================================================== */
function initCampaignSpotlightSlider() {
  const spotlightSection = document.querySelector('.spotlight-editorial-section');
  if (!spotlightSection) return;

  const slides = spotlightSection.querySelectorAll('.spotlight-slide');
  if (slides.length === 0) return;

  const dots = spotlightSection.querySelectorAll('.spotlight-dot');
  const prevBtn = spotlightSection.querySelector('.spotlight-prev-btn');
  const nextBtn = spotlightSection.querySelector('.spotlight-next-btn');
  const progressBar = spotlightSection.querySelector('.spotlight-progress-fill');

  let currentSlide = 0;
  const slideDuration = 4000; // 4 seconds auto-scrolling
  let slideTimer = null;
  let isPaused = false;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    currentSlide = index;
    resetProgressBar();
  }

  function resetProgressBar() {
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      void progressBar.offsetWidth; // Trigger DOM reflow
      progressBar.style.transition = `width ${slideDuration}ms linear`;
      if (!isPaused) {
        progressBar.style.width = '100%';
      }
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    isPaused = false;
    resetProgressBar();

    slideTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideDuration);
  }

  function stopAutoPlay() {
    isPaused = true;
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
    if (progressBar) {
      const computedWidth = window.getComputedStyle(progressBar).width;
      progressBar.style.transition = 'none';
      progressBar.style.width = computedWidth;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentSlide + 1);
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentSlide - 1);
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoPlay();
    });
  });

  spotlightSection.addEventListener('mouseenter', stopAutoPlay);
  spotlightSection.addEventListener('mouseleave', startAutoPlay);
  spotlightSection.addEventListener('touchstart', stopAutoPlay, { passive: true });
  spotlightSection.addEventListener('touchend', () => {
    setTimeout(startAutoPlay, 1500);
  }, { passive: true });

  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   Global Form Handlers & Contact Utilities
   ========================================================================== */
function updateContactTopicHint(topic) {
  const hintEl = document.getElementById('cTopicHint');
  if (!hintEl) return;
  
  if (topic === 'Community Connect Internship') {
    hintEl.style.display = 'block';
    hintEl.innerHTML = '<i class="fas fa-info-circle"></i> Direct Internship Helpline: <strong>+91 91862 11983</strong> (Open to all students in Hyderabad)';
  } else if (topic === 'Donation & 80G Tax Receipts') {
    hintEl.style.display = 'block';
    hintEl.innerHTML = '<i class="fas fa-shield-alt"></i> 80G Tax Exemption receipts issued within 48 hours via email.';
  } else if (topic === 'Corporate CSR Alliances') {
    hintEl.style.display = 'block';
    hintEl.innerHTML = '<i class="fas fa-briefcase"></i> MCA Registered CSR-1 Implementing Agency (Schedule VII compliant).';
  } else {
    hintEl.style.display = 'none';
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cName')?.value || 'Friend';
  const email = document.getElementById('cEmail')?.value || '';
  const topic = document.getElementById('cSubject')?.value || 'General Inquiry';
  const refNo = 'WVF-CNT-' + Math.floor(100000 + Math.random() * 900000);

  const existing = document.getElementById('contactSuccessModal');
  if (existing) existing.remove();

  const modalHtml = `
    <div class="modal-overlay active" id="contactSuccessModal" style="display: flex;">
      <div class="modal-card" style="max-width: 480px; text-align: center; padding: 30px;">
        <div style="width: 64px; height: 64px; background: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px auto;">
          <i class="fas fa-check"></i>
        </div>
        <h3 style="color: var(--secondary); font-size: 1.35rem; margin-bottom: 8px;">Message Sent Successfully!</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">
          Thank you, <strong>${name}</strong>! Your message regarding <em>"${topic}"</em> has been received by our national secretariat.
        </p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; font-size: 0.85rem; margin-bottom: 20px; color: var(--text-main);">
          Tracking Reference ID: <strong style="color: var(--primary);">${refNo}</strong><br>
          <span style="font-size: 0.78rem; color: var(--text-light);">We will reach out to <strong>${email}</strong> shortly.</span>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <a href="https://wa.me/919100894893?text=Hi%20White%20Volunteers%20Foundation,%20I%20just%20submitted%20inquiry%20${refNo}" target="_blank" class="btn btn-outline btn-sm" style="border-color: #25d366; color: #16a34a;"><i class="fab fa-whatsapp"></i> Quick WhatsApp Chat</a>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('contactSuccessModal').remove()">Done</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  e.target.reset();
}

function handleVolunteerSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('volName')?.value || 'Volunteer';
  const refNo = 'WVF-VOL-' + Math.floor(100000 + Math.random() * 900000);

  const existing = document.getElementById('volSuccessModal');
  if (existing) existing.remove();

  const modalHtml = `
    <div class="modal-overlay active" id="volSuccessModal" style="display: flex;">
      <div class="modal-card" style="max-width: 480px; text-align: center; padding: 30px;">
        <div style="width: 64px; height: 64px; background: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px auto;">
          <i class="fas fa-user-check"></i>
        </div>
        <h3 style="color: var(--secondary); font-size: 1.35rem; margin-bottom: 8px;">Application Submitted!</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">
          Welcome aboard, <strong>${name}</strong>! Your volunteer registration application has been logged.
        </p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; font-size: 0.85rem; margin-bottom: 20px; color: var(--text-main);">
          Registration Reference ID: <strong style="color: var(--primary);">${refNo}</strong>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <a href="https://wa.me/919100894893?text=Hi%20White%20Volunteers%20Foundation,%20I%20applied%20to%20volunteer%20${refNo}" target="_blank" class="btn btn-outline btn-sm" style="border-color: #25d366; color: #16a34a;"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('volSuccessModal').remove(); if(typeof closeAllModals === 'function') closeAllModals();">Done</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  e.target.reset();
}

function copyToClipboard(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyToast(label + ' copied to clipboard!');
    }).catch(() => {
      fallbackCopyText(text, label);
    });
  } else {
    fallbackCopyText(text, label);
  }
}

function fallbackCopyText(text, label) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showCopyToast(label + ' copied to clipboard!');
}

function showCopyToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = 'position: fixed; bottom: 30px; right: 30px; background: #0f172a; color: #fff; padding: 12px 20px; border-radius: 8px; font-size: 0.88rem; font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.25); z-index: 9999; animation: fadeIn 0.3s ease;';
  toast.innerHTML = '<i class="fas fa-check-circle" style="color: #22c55e; margin-right: 8px;"></i> ' + msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}


