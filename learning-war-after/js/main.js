// js/main.js
(() => {
  // =======================
  // DATA (PDF + Videos)
  // =======================
  const materials = [
    { stage: "primary", subject: "اللغة العربية", title: "كتاب اللغة العربية", level: "سهل", file: "arabic_primary.pdf" },
    { stage: "primary", subject: "الرياضيات", title: "شرح أساسيات الرياضيات", level: "سهل", file: "math_primary.pdf" },
    { stage: "primary", subject: "العلوم", title: "مدخل العلوم", level: "سهل", file: "science_primary.pdf" },
    { stage: "primary", subject: "اللغة الإنجليزية", title: "مفردات وقواعد أساسية", level: "سهل", file: "english_primary.pdf" },

    { stage: "preparatory", subject: "اللغة العربية", title: "مهارات قراءة وقواعد", level: "متوسط", file: "arabic_preparatory.pdf" },
    { stage: "preparatory", subject: "الرياضيات", title: "أساسيات الجبر والهندسة", level: "متوسط", file: "math_preparatory.pdf" },
    { stage: "preparatory", subject: "العلوم", title: "وحدات مختارة في العلوم", level: "متوسط", file: "science_preparatory.pdf" },

    { stage: "secondary", subject: "الرياضيات", title: "محاور رياضيات متقدمة", level: "صعب", file: "math_secondary.pdf" },
    { stage: "secondary", subject: "الفيزياء", title: "أساسيات الفيزياء", level: "صعب", file: "physics_secondary.pdf" },
    { stage: "secondary", subject: "الكيمياء", title: "مفاهيم الكيمياء", level: "صعب", file: "chemistry_secondary.pdf" },
  ];

  const videosByStage = {
    primary: [
      "https://youtu.be/KWRbbfoP20c",
      "https://youtu.be/OoeGWoQkWuo",
      "https://youtu.be/rSEGn5_QDk0",
      "https://youtu.be/4XM55cmk4tI",
      "https://youtu.be/zpocs3R1N1g",
      "https://youtu.be/D-1VQ6GbKRM"
    ],
    preparatory: [
      "https://youtu.be/7MUzsMMGbWU",
      "https://youtu.be/PkQrBCHQeJY",
      "https://youtu.be/WZBJbJr_YEo",
      "https://youtu.be/fYP_qT9qmsU",
      "https://youtu.be/83k8FWT5ofc",
      "https://youtu.be/ZQXfcd__3FY"
    ],
    secondary: [
      "https://youtu.be/bwS5cDmE0Bo",
      "https://youtu.be/gbcwDeT-f8o",
      "https://youtu.be/IWSSBy0W1BI",
      "https://youtu.be/RFrfpl9i2Ec",
      "https://youtu.be/dK9dUU4heoQ",
      "https://youtu.be/OplS7jI756I"
    ]
  };

  // =======================
  // ELEMENTS
  // =======================
  const materialsBody = document.getElementById("materialsBody");
  const materialsEmpty = document.getElementById("materialsEmpty");
  const materialsSearch = document.getElementById("materialsSearch");
  const subjectFilter = document.getElementById("subjectFilter");
  const clearFilters = document.getElementById("clearFilters");

  const videosGrid = document.getElementById("videosGrid");
  const videosCount = document.getElementById("videosCount");

  const pdfModalEl = document.getElementById("pdfModal");
  const pdfModal = pdfModalEl ? new bootstrap.Modal(pdfModalEl) : null;
  const pdfFrame = document.getElementById("pdfFrame");
  const pdfTitle = document.getElementById("pdfTitle");
  const pdfOpenNew = document.getElementById("pdfOpenNew");

  const videoModalEl = document.getElementById("videoModal");
  const videoModal = videoModalEl ? new bootstrap.Modal(videoModalEl) : null;
  const videoFrame = document.getElementById("videoFrame");
  const videoTitle = document.getElementById("videoTitle");
  const videoOpenNew = document.getElementById("videoOpenNew");

  let currentStage = "primary";

  // =======================
  // HELPERS
  // =======================
  const normalize = (s) => (s || "").toString().trim().toLowerCase().replace(/\s+/g, " ");

  const levelBadge = (level) => {
    if (level === "سهل") return `<span class="badge bg-success">سهل</span>`;
    if (level === "متوسط") return `<span class="badge bg-secondary">متوسط</span>`;
    if (level === "صعب") return `<span class="badge bg-dark">صعب</span>`;
    return `<span class="badge bg-secondary">${level || "—"}</span>`;
  };

  const stageLabel = (stage) => stage === "primary" ? "ابتدائي" : stage === "preparatory" ? "إعدادي" : "ثانوي";

  const isRunningOnServer = () => location.protocol.startsWith("http");

  const youtubeIdFromUrl = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "").trim();
      if (u.searchParams.get("v")) return u.searchParams.get("v").trim();
      const parts = u.pathname.split("/").filter(Boolean);
      const vIndex = parts.indexOf("embed");
      if (vIndex !== -1 && parts[vIndex + 1]) return parts[vIndex + 1].trim();
      return "";
    } catch {
      return "";
    }
  };

  const youtubeThumb = (id) => id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";

  const youtubeEmbed = (id) => id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";

  // =======================
  // PDF OPEN (Modal Dynamic)
  // =======================
  function openLessonPDF(file, titleText) {
    const url = `./lessons/${encodeURIComponent(file)}`;

    if (!isRunningOnServer()) {
      alert("تعذّر الوصول للملف.\nتأكدي من تشغيل المشروع عبر Go Live وليس file://");
      return;
    }

    // تحقق سريع من وجود الملف
    fetch(url, { method: "HEAD" })
      .then(res => {
        if (!res.ok) {
          alert("الملف غير موجود داخل lessons:\n\n" + file + "\n\nتأكدي من الاسم والامتداد .pdf");
          return;
        }

        if (pdfTitle) pdfTitle.textContent = titleText || "عرض ملف PDF";
        if (pdfOpenNew) pdfOpenNew.href = url;

        // عرض داخل مودال
        if (pdfFrame) pdfFrame.src = url;

        if (pdfModal) pdfModal.show();
        else window.open(url, "_blank", "noopener");
      })
      .catch(() => {
        alert("تعذر الوصول للملف.\nتأكدي من تشغيل المشروع عبر Go Live.");
      });
  }

  // تنظيف iframe عند إغلاق المودال
  if (pdfModalEl) {
    pdfModalEl.addEventListener("hidden.bs.modal", () => {
      if (pdfFrame) pdfFrame.src = "";
    });
  }

  // =======================
  // MATERIALS RENDER (JS + jQuery for input hooks)
  // =======================
  const fillSubjectFilter = () => {
    const subjects = materials.filter(m => m.stage === currentStage).map(m => m.subject);
    const unique = [...new Set(subjects)];
    subjectFilter.innerHTML = `<option value="all">كل المواد</option>` + unique.map(s => `<option value="${s}">${s}</option>`).join("");
  };

  const renderMaterials = () => {
    const q = normalize(materialsSearch.value);
    const subject = subjectFilter.value;

    const rows = materials
      .filter(m => m.stage === currentStage)
      .filter(m => subject === "all" ? true : m.subject === subject)
      .filter(m => !q ? true : normalize(`${m.subject} ${m.title} ${m.level} ${m.file}`).includes(q));

    if (!rows.length) {
      materialsBody.innerHTML = "";
      materialsEmpty.classList.remove("d-none");
      return;
    }
    materialsEmpty.classList.add("d-none");

    materialsBody.innerHTML = rows.map(m => `
      <tr>
        <td class="fw-semibold">${m.subject}</td>
        <td>${m.title}</td>
        <td>${levelBadge(m.level)}</td>
        <td class="text-end">
          <button type="button" class="btn btn-sm btn-primary open-pdf"
            data-file="${m.file}" data-title="${m.subject} — ${m.title}">
            فتح
          </button>
        </td>
      </tr>
    `).join("");

    materialsBody.querySelectorAll(".open-pdf").forEach(btn => {
      btn.addEventListener("click", () => {
        const f = btn.getAttribute("data-file");
        const t = btn.getAttribute("data-title");
        openLessonPDF(f, t);
      });
    });
  };

  // =======================
  // VIDEOS RENDER (Thumbs + Modal + Open)
  // =======================
  const renderVideos = () => {
    const list = videosByStage[currentStage] || [];
    videosCount.textContent = `${list.length} فيديو`;

    videosGrid.innerHTML = list.map((url, i) => {
      const id = youtubeIdFromUrl(url);
      const thumb = youtubeThumb(id);
      return `
        <div class="col-md-6 col-lg-4">
          <div class="card card-soft h-100 hover-lift">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge text-bg-primary">فيديو ${i + 1}</span>
                <span class="text-muted small">${stageLabel(currentStage)}</span>
              </div>

              <div class="video-thumb mb-3">
                <img src="${thumb}" alt="صورة مصغرة للفيديو">
              </div>

              <div class="video-meta mb-3">${url}</div>

              <div class="d-flex gap-2 mt-auto">
                <button type="button" class="btn btn-outline-primary flex-grow-1 play-video"
                  data-url="${url}" data-id="${id}" data-title="فيديو ${i + 1} - ${stageLabel(currentStage)}">
                  تشغيل
                </button>
                <a class="btn btn-primary" href="${url}" target="_blank" rel="noopener" title="فتح على YouTube">
                  <i class="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // تشغيل داخل مودال (قد يُمنع لبعض الفيديوهات)
    videosGrid.querySelectorAll(".play-video").forEach(btn => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-url");
        const id = btn.getAttribute("data-id");
        const title = btn.getAttribute("data-title");

        if (videoTitle) videoTitle.textContent = title || "تشغيل فيديو";
        if (videoOpenNew) videoOpenNew.href = url;

        if (videoFrame) videoFrame.src = youtubeEmbed(id);
        if (videoModal) videoModal.show();
        else window.open(url, "_blank", "noopener");
      });
    });
  };

  if (videoModalEl) {
    videoModalEl.addEventListener("hidden.bs.modal", () => {
      if (videoFrame) videoFrame.src = "";
    });
  }

  // =======================
  // SET STAGE (Conditions + DOM)
  // =======================
  const setStage = (stage) => {
    currentStage = stage;

    document.querySelectorAll(".stage-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.stage === stage);
    });

    fillSubjectFilter();
    renderMaterials();
    renderVideos();
  };

  // =======================
  // DARK MODE (LocalStorage)
  // =======================
  const darkBtn = document.getElementById("darkBtn");

  const applyDarkMode = (on) => {
    document.body.classList.toggle("dark", !!on);

    if (darkBtn) {
      const icon = darkBtn.querySelector("i");
      const text = darkBtn.querySelector("span");

      if (on) {
        if (icon) icon.className = "fa-solid fa-sun";
        if (text) text.textContent = "الوضع النهاري";
        darkBtn.classList.remove("btn-outline-dark");
        darkBtn.classList.add("btn-outline-light");
      } else {
        if (icon) icon.className = "fa-solid fa-moon";
        if (text) text.textContent = "الوضع الليلي";
        darkBtn.classList.add("btn-outline-dark");
        darkBtn.classList.remove("btn-outline-light");
      }
    }
  };

  const loadDarkMode = () => {
    const saved = localStorage.getItem("lwa_dark");
    applyDarkMode(saved === "1");
  };

  const toggleDarkMode = () => {
    const now = !document.body.classList.contains("dark");
    localStorage.setItem("lwa_dark", now ? "1" : "0");
    applyDarkMode(now);
  };

  // =======================
  // FAQ (jQuery SlideToggle)
  // =======================
  const initFaq = () => {
    $(".faq-q").on("click", function () {
      const $item = $(this).closest(".faq-item");
      const $ans = $item.find(".faq-a");
      const $icon = $(this).find("i");

      // إغلاق باقي العناصر (Accordion behavior)
      $(".faq-a").not($ans).slideUp(180);
      $(".faq-q i").not($icon).removeClass("rot");

      $ans.stop(true, true).slideToggle(180);
      $icon.toggleClass("rot");
    });
  };

  // =======================
  // PORTFOLIO (jQuery Filter + Search + Animations)
  // =======================
  const initPortfolio = () => {
    const $grid = $("#portfolioGrid");
    const $items = $grid.find(".portfolio-item");
    const $empty = $("#portfolioEmpty");

    const applyPortfolioFilter = () => {
      const stage = $("#portfolioFilter").val();
      const q = normalize($("#portfolioSearch").val());

      let visibleCount = 0;

      $items.each(function () {
        const s = $(this).data("stage");
        const text = normalize($(this).data("text"));

        const okStage = stage === "all" ? true : (s === stage);
        const okSearch = q ? text.includes(q) : true;

        if (okStage && okSearch) {
          $(this).stop(true, true).fadeIn(180);
          visibleCount++;
        } else {
          $(this).stop(true, true).fadeOut(180);
        }
      });

      $empty.toggleClass("d-none", visibleCount !== 0);
    };

    $("#portfolioFilter").on("change", applyPortfolioFilter);
    $("#portfolioSearch").on("input", applyPortfolioFilter);

    $("#portfolioToggle").on("click", function () {
      $("#portfolioWrap").stop(true, true).slideToggle(220);
    });

    // زر فتح المواد من المعرض
    $(".portfolio-go").on("click", function () {
      const stage = $(this).data("stage");
      setStage(stage);

      const target = $(this).data("go");
      if (target) {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    });

    applyPortfolioFilter();
  };

  // =======================
  // TABLE CONTROLS (DOM)
  // =======================
  const initTableControls = () => {
    const toggleBtn = document.getElementById("toggleSkills");
    const highlightBtn = document.getElementById("highlightRow");
    const table = document.getElementById("skillsTable");
    const row = document.getElementById("jsRow");

    if (toggleBtn && table) {
      toggleBtn.addEventListener("click", () => {
        const isHidden = table.classList.toggle("d-none");
        toggleBtn.textContent = isHidden ? "إظهار الجدول" : "إخفاء الجدول";
      });
    }

    if (highlightBtn && row) {
      highlightBtn.addEventListener("click", () => {
        row.classList.toggle("table-warning");
      });
    }
  };

  // =======================
  // MEDIA VIDEO CONTROLS (DOM)
  // =======================
  const initMediaControls = () => {
    const introVideo = document.getElementById("introVideo");
    const play = document.getElementById("playIntro");
    const pause = document.getElementById("pauseIntro");

    if (play && introVideo) play.addEventListener("click", () => introVideo.play().catch(() => {}));
    if (pause && introVideo) pause.addEventListener("click", () => introVideo.pause());
  };

  // =======================
  // CONTACT FORM (Events)
  // =======================
  const initContact = () => {
    const contactForm = document.getElementById("contactForm");
    const successMsg = document.getElementById("successMsg");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactForm.reset();
      successMsg?.classList.remove("d-none");
      setTimeout(() => successMsg?.classList.add("d-none"), 2200);
    });
  };

  // =======================
  // MATERIALS INPUTS (jQuery hooks)
  // =======================
  const initMaterialsInputs = () => {
    $(materialsSearch).on("input", () => renderMaterials());
    $(subjectFilter).on("change", () => renderMaterials());

    $(clearFilters).on("click", () => {
      materialsSearch.value = "";
      subjectFilter.value = "all";
      renderMaterials();
    });

    $(".stage-btn").on("click", function () {
      setStage($(this).data("stage"));
    });
  };

  // =======================
  // INIT
  // =======================
  document.addEventListener("DOMContentLoaded", () => {
    loadDarkMode();

    if (darkBtn) darkBtn.addEventListener("click", toggleDarkMode);

    initFaq();
    initPortfolio();
    initMaterialsInputs();
    initTableControls();
    initMediaControls();
    initContact();

    // بداية افتراضية
    setStage("primary");
  });
})();
