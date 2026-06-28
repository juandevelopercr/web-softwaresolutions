/*--------------- TABLE OF CONTENTS -------------

01. Preloader Js
02. Positon Sticky Js
03. Data BG Js
04. Header Sticky Js
05. Search Bar Js
06. Hamburger Menu Js
07. Nice Select Js
08. Hero Slider Js
09. Blog Slider Js
10. Marquee Slider Js
11. Brand Slider Js
12. Project Slider Js
13. Service Slider Js
14. Team Slider Js
15. Testimonial Slider Js
16. Rating Js Js
17. Fun Fact Js
18. Project 3 Active Js
19. Circle Proggess Bar Js
20. VenoBox Js
21. Mouse Js
22. Backtotop Js
23. Skill  Progress Bar Js
24. Price box Js
25. Gsap Js

-------------------------------------------------*/

(function ($) {
	"use strict";

	/* ------------- Preloader Js -------------*/

	var wind = $(window);
	wind.on("load", function () {
		$(".preloader").fadeOut(600);
	});

	/* ------------- Data BG Js -------------*/

	$("[data-bg-image]").each(function () {
		var $this = $(this),
			$image = $this.data("bg-image");
		$this.css("background-image", "url(" + $image + ")");
	});
	$("[data-mask]").each(function () {
		var $this = $(this),
			$mask_image = $this.data("mask");
		$this.css("mask-image", "url(" + $mask_image + ")");
	});

	/* ------------- Header Sticky Js -------------*/

	var lastScrollTop = "";
	function stickyMenu($targetMenu, $toggleClass) {
		var st = $(window).scrollTop();
		if ($(window).scrollTop() > 500) {
			if (st > lastScrollTop) {
				$targetMenu.removeClass($toggleClass);
			} else {
				$targetMenu.addClass($toggleClass);
			}
		} else {
			$targetMenu.removeClass($toggleClass);
		}

		lastScrollTop = st;
	}

	$(window).on("scroll", function () {
		if ($(".tj-header-area").length) {
			stickyMenu($(".header-sticky"), "sticky");
		}
	});

	/* ------------- Search Bar Js -------------*/

	$(".header_search").on("click", function () {
		$(".search_popup").addClass("search-opened");
		$(".search-popup-overlay").addClass("opened");
	});
	$(".search_close_btn").on("click", function () {
		$(".search_popup").removeClass("search-opened");
		$(".search-popup-overlay").removeClass("opened");
	});
	$(".search-popup-overlay").on("click", function () {
		$(".search_popup").removeClass("search-opened");
		$(this).removeClass("opened");
	});

	/* ------------- Hamburger Menu  Js -------------*/

	$("#main-menu").meanmenu({
		meanMenuContainer: ".mobile_menu",
		meanScreenWidth: "991",
		meanExpand: ['<i class="tji-angle-down"></i>'],
	});

	$(".menu_btn").on("click", function () {
		$(".hamburger-area").addClass("opened");
		$(".body-overlay").addClass("opened");
	});
	$(".hamburgerCloseBtn").on("click", function () {
		$(".hamburger-area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
	});
	$(".body-overlay").on("click", function () {
		$(".hamburger-area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
	});

	/* ------------- Nice Select  Js -------------*/

	if ($("select").length > 0) {
		$("select").niceSelect();
	}

	/* ------------- Hero Slider  Js -------------*/

	if ($(".full-slider-active").length > 0) {
		let full_screen = new Swiper(".full-slider-active", {
			speed: 2000,
			effect: "fade",
			loop: true,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				prevEl: ".tj-btn-prev",
				nextEl: ".tj-btn-next",
			},
			pagination: {
				el: ".tj-sw-pagination",
				type: "fraction",
				clickable: true,
				renderFraction: function (currentClass, totalClass) {
					return (
						'<span class="' +
						currentClass +
						'"></span>' +
						' <span class="dash"><span class="dash-inner"></span></span> ' +
						'<span class="' +
						totalClass +
						'"></span>'
					);
				},
			},
			on: {
				init: function () {
					updateDashWidth(this);
				},
				slideChange: function () {
					updateDashWidth(this);
				},
			},
		});

		function updateDashWidth(swiper) {
			const dashInner = swiper.el.querySelector(".dash-inner");
			if (dashInner) {
				const realIndex = swiper.realIndex;
				const totalSlides = swiper.slides.length - swiper.loopedSlides * 2;
				const progressPercent = ((realIndex + 1) / totalSlides) * 100;

				dashInner.style.width = progressPercent + "%";
			}
		}
	}

	if ($(".h6-hero-slider").length > 0) {
		let marquee = new Swiper(".h6-hero-slider", {
			slidesPerView: "auto",
			spaceBetween: 30,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 8000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
				},
				1400: {
					spaceBetween: 30,
				},
			},
		});
	}

	/* ------------- Blog Slider  Js -------------*/

	if ($(".blog-standard-slider").length > 0) {
		let blog = new Swiper(".blog-standard-slider", {
			slidesPerView: 1,
			loop: true,
			speed: 1200,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
		});
	}

	/* ------------- Marquee Slider  Js -------------*/

	if ($(".marquee-slider").length > 0) {
		let marquee = new Swiper(".marquee-slider", {
			slidesPerView: "auto",
			spaceBetween: 0,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 4000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}

	if ($(".h6-marquee-slider").length > 0) {
		let marquee = new Swiper(".h6-marquee-slider", {
			slidesPerView: "auto",
			spaceBetween: 20,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 4000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
			},
		});
	}

	if ($(".h9-hero-marquee-slider").length > 0) {
		let marquee = new Swiper(".h9-hero-marquee-slider", {
			slidesPerView: "auto",
			spaceBetween: 0,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 6000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}
	/* ------------- Brand Slider  Js -------------*/

	if ($(".brand-slider-1").length > 0) {
		let brand = new Swiper(".brand-slider-1", {
			slidesPerView: "auto",
			spaceBetween: 30,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 5000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				576: {
					slidesPerView: 2.5,
				},
				768: {
					slidesPerView: 3.3,
				},
				992: {
					slidesPerView: 4.5,
				},
				1200: {
					slidesPerView: 5.2,
				},
				1400: {
					slidesPerView: 6,
				},
			},
		});
	}
	if ($(".brand-slider-2").length > 0) {
		let brand = new Swiper(".brand-slider-2", {
			slidesPerView: "auto",
			spaceBetween: 30,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 5000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				430: {
					slidesPerView: 2.5,
				},
				768: {
					slidesPerView: 3.3,
				},
				992: {
					slidesPerView: 4.5,
				},
				1200: {
					slidesPerView: 5.2,
				},
				1400: {
					slidesPerView: 6,
				},
			},
		});
	}

	/* ------------- Project Slider  Js -------------*/
	if ($(".project-slider").length > 0) {
		let project = new Swiper(".project-slider", {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			speed: 2000,
			arrow: false,
			breakpoints: {
				375: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
			},
		});
	}

	if ($(".h5-case-study-slider").length > 0) {
		let project = new Swiper(".h5-case-study-slider", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			speed: 1000,
			arrow: false,
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},
		});
	}

	if ($(".h7-case-study-slider").length > 0) {
		var swiper = new Swiper(".h7-case-study-slider", {
			slidesPerView: 1,
			loop: true,
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			spaceBetween: -100,
			freemode: true,
			speed: 1000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 800,
				modifier: 1,
				slideShadows: false,
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".tj-project-nav-next",
				prevEl: ".tj-project-nav-prev",
			},
		});
	}
	if ($(".h8-case-study-slider").length > 0) {
		let project = new Swiper(".h8-case-study-slider", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			speed: 1000,
			arrow: false,
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},
		});
	}
	/* ------------- Service Slider  Js -------------*/
	if ($(".tj-service-slider").length > 0) {
		let service = new Swiper(".tj-service-slider", {
			slidesPerView: 3,
			spaceBetween: 24,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 8500,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".service-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 3,
				},
			},
		});
	}

	if ($(".h6-services-slider").length > 0) {
		let service = new Swiper(".h6-services-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			speed: 1500,
			// autoplay: {
			// 	delay: 5000,
			// },
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
			},
		});
	}

	if ($(".h9-services-slider").length > 0) {
		let service = new Swiper(".h9-services-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
			},
		});
	}

	/* ------------- Team Slider Js -------------*/

	if ($(".tj-team-slider").length > 0) {
		let team = new Swiper(".tj-team-slider", {
			slidesPerView: 4,
			spaceBetween: 24,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 8500,
			},
			pagination: {
				el: ".service-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				460: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 4,
				},
			},
		});
	}

	/* ------------- Testimonial Slider Js -------------*/
	if ($(".team-tab-slider").length > 0) {
		let team = new Swiper(".team-tab-slider", {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: false,
			speed: 1500,
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				320: {
					slidesPerView: 2,
				},
				420: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 4,
				},
				1024: {
					slidesPerView: 5,
				},
				1200: {
					slidesPerView: 6,
				},
			},
		});
	}

	/* ------------- Testimonial Slider Js -------------*/

	if ($(".tj-testimonial-slider").length > 0) {
		let testimonial = new Swiper(".tj-testimonial-slider", {
			slidesPerView: 3,
			spaceBetween: 24,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 8500,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 1,
				},
				992: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 2,
				},
			},
		});
	}
	if ($(".tj-testimonial-slider-two").length > 0) {
		let testimonial2 = new Swiper(".tj-testimonial-slider-two", {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
		});
	}
	if ($(".testimonial-slider-two").length > 0) {
		let testimonial = new Swiper(".testimonial-slider-two", {
			slidesPerView: 3,
			spaceBetween: 65,
			centeredSlides: true,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 2000,
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1.5,
				},
				768: {
					slidesPerView: 1.5,
				},
				992: {
					slidesPerView: 1.5,
				},
				1200: {
					slidesPerView: 1.9,
				},
				1440: {
					slidesPerView: 2.9,
				},
			},
		});
	}
	if ($(".h6-testimonial-slider").length > 0) {
		let testimonial = new Swiper(".h6-testimonial-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			speed: 1000,
			autoplay: {
				delay: 2000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				450: {
					slidesPerView: 1.5,
				},
				576: {
					slidesPerView: 1.5,
				},
				768: {
					slidesPerView: 1.5,
				},
				992: {
					slidesPerView: 2.5,
				},
				1200: {
					slidesPerView: 2.5,
				},
				1400: {
					slidesPerView: 3,
				},
			},
		});
	}

	// Home 8 testimonial
	const testimonialsMarqueeSliders = {};

	function testimonialsMarquee(selector, isReverse = false, speed = 8000) {
		const screenWidth = window.innerWidth;
		const direction = screenWidth >= 768 ? "vertical" : "horizontal";

		// Destroy previous instance if exists
		if (testimonialsMarqueeSliders[selector]) {
			testimonialsMarqueeSliders[selector].destroy(true, true);
		}

		// Init if element exists
		if ($(selector).length > 0) {
			testimonialsMarqueeSliders[selector] = new Swiper(selector, {
				slidesPerView: "auto",
				spaceBetween: 24,
				centeredSlides: true,
				loop: true,
				allowTouchMove: false,
				speed: speed,
				direction: direction,
				autoplay: {
					delay: 0,
					disableOnInteraction: false,
					reverseDirection: isReverse,
				},
				breakpoints: {
					768: {
						spaceBetween: 30,
					},
				},
			});
		}
	}

	// Initialize both sliders
	testimonialsMarquee(".h8-testimonial-slider-up");
	testimonialsMarquee(".h8-testimonial-slider-down", true);

	// Reinitialize on resize
	window.addEventListener("resize", () => {
		testimonialsMarquee(".h8-testimonial-slider-up");
		testimonialsMarquee(".h8-testimonial-slider-down", true);
	});

	// Home 9 testimonial
	if ($(".client-thumb").length > 0) {
		var thumbs = new Swiper(".client-thumb", {
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			speed: 1500,
			// centeredSlides: false,
			freeMode: true,
			watchSlidesProgress: true,
			slideToClickedSlide: true,
			breakpoints: {
				0: {
					slidesPerView: 1.4,
					spaceBetween: 10,
				},
				430: {
					slidesPerView: 1.6,
				},
				530: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 2.4,
				},
				992: {
					slidesPerView: 3,
					centeredSlides: true,
				},
			},
		});
	}
	if ($(".h9-testimonial-slider").length > 0) {
		var testimonial = new Swiper(".h9-testimonial-slider", {
			slidesPerView: 1,
			spaceBetween: 28,
			loopedSlides: 3,
			loop: true,
			speed: 1500,
			// autoplay: {
			// 	delay: 3000,
			// },
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
		});

		testimonial.controller.control = thumbs;
		thumbs.controller.control = testimonial;
	}
	if ($(".h10-testimonial-slider").length > 0) {
		let testimonial = new Swiper(".h10-testimonial-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			speed: 1000,
			autoplay: {
				delay: 2000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	// tab
	const tabs = document.querySelectorAll(".h6-tab");
	const contents = document.querySelectorAll(".h6-tab-content");

	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			tabs.forEach(t => t.classList.remove("active"));
			contents.forEach(c => c.classList.remove("active"));

			tab.classList.add("active");
			const index = tab.getAttribute("data-index");
			document.getElementById("tab-" + index).classList.add("active");
		});
	});

	/* ------------- H5 Process Hover Active -------------*/
	if ($(".h5-process_wrap").length > 0) {
		$(".h5-process_item").on("mouseenter", function () {
			$(this).addClass("active").siblings().removeClass("active");
		});
	}

	/* ------------- Rating Js -------------*/

	if ($(".fill-ratings span").length > 0) {
		var star_rating_width = $(".fill-ratings span").width();
		$(".star-ratings").width(star_rating_width);
	}

	/* ------------- Fun Fact Js -------------*/

	if ($(".odometer").length > 0) {
		$(".odometer").each(function () {
			var $this = $(this);
			$this.appear(
				function () {
					var countNumber = $this.attr("data-count");
					$this.html(countNumber);
				},
				{ accX: 0, accY: 0 }
			); // Optional: Adjust appearance threshold
		});
	}

	/* ------------- Project 3 Active Js -------------*/

	$(".project-style-3").on("mouseenter", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});

	const headers = document.querySelectorAll(".header");
	headers.forEach(header => {
		header.addEventListener("click", () => {
			const caseItem = header.parentElement;
			const isActive = caseItem.classList.contains("active");

			// Close all sections
			document.querySelectorAll(".case-item").forEach(sec => {
				sec.classList.remove("active");
				sec.querySelector(".icon").classList.remove("active");
			});

			// Toggle current section
			if (!isActive) {
				caseItem.classList.add("active");
				header.querySelector(".icon").classList.add("active");
			}
		});
	});

	/* ------------- Circle Proggess Bar Js -------------*/

	if (typeof $.fn.knob != "undefined") {
		$(".knob").each(function () {
			var $this = $(this),
				knobVal = $this.attr("data-rel");

			$this.knob({
				draw: function () {
					$(this.i).val(this.cv + "%");
				},
			});

			$this.appear(
				function () {
					$({
						value: 0,
					}).animate(
						{
							value: knobVal,
						},
						{
							duration: 2000,
							easing: "swing",
							step: function () {
								$this.val(Math.ceil(this.value)).trigger("change");
							},
						}
					);
				},
				{
					accX: 0,
					accY: -150,
				}
			);
		});
	}

	/* ------------- VenoBox Js -------------*/

	if ($(".ig-gallery").length > 0) {
		new VenoBox({
			selector: ".ig-gallery",
			numeration: true,
			spinner: "pulse",
		});
	}
	if ($(".video-popup").length > 0) {
		new VenoBox({
			selector: ".video-popup",
			numeration: true,
			spinner: "pulse",
		});
	}

	/* ------------- Mouse Js -------------*/

	$(".slider-drag").on("mouseenter", function () {
		$(".mouseCursor").addClass("cursor-big");
	});
	$(".slider-drag").on("mouseleave", function () {
		$(".mouseCursor").removeClass("cursor-big");
	});

	$("a,.sub-menu").on("mouseenter", function () {
		$(".mouseCursor,.tj-cursor").addClass("d-none");
	});
	$("a,.sub-menu").on("mouseleave", function () {
		$(".mouseCursor,.tj-cursor").removeClass("d-none");
	});

	$(".project-slider-one").on("mouseenter", function () {
		$(".mouseCursor").addClass("d-none");
	});
	$(".project-slider-one").on("mouseleave", function () {
		$(".mouseCursor").removeClass("d-none");
	});

	$(".view-project").on("mouseenter", function () {
		$(".mouseCursor").addClass("project-cursor");
	});
	$(".view-project").on("mouseleave", function () {
		$(".mouseCursor").removeClass("project-cursor");
	});

	function itCursor() {
		var myCursor = jQuery(".mouseCursor");
		if (myCursor.length) {
			if ($("body")) {
				const e = document.querySelector(".cursor-inner"),
					t = document.querySelector(".cursor-outer");
				let n,
					i = 0,
					o = !1;
				(window.onmousemove = function (s) {
					o ||
						(t.style.transform =
							"translate(" + s.clientX + "px, " + s.clientY + "px)"),
						(e.style.transform =
							"translate(" + s.clientX + "px, " + s.clientY + "px)"),
						(n = s.clientY),
						(i = s.clientX);
				}),
					$("body").on("mouseenter", "button, a, .cursor-pointer", function () {
						e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
					}),
					$("body").on("mouseleave", "button, a, .cursor-pointer", function () {
						($(this).is("a", "button") &&
							$(this).closest(".cursor-pointer").length) ||
							(e.classList.remove("cursor-hover"),
							t.classList.remove("cursor-hover"));
					}),
					(e.style.visibility = "visible"),
					(t.style.visibility = "visible");
			}
		}
	}
	itCursor();

	/* ------------- Backtotop Js -------------*/

	function back_to_top() {
		var btn = $("#back_to_top");
		var btn_wrapper = $(".back-to-top-wrapper");
		$(window).on("scroll", function () {
			if ($(window).scrollTop() > 300) {
				btn_wrapper.addClass("back-to-top-btn-show");
			} else {
				btn_wrapper.removeClass("back-to-top-btn-show");
			}
		});
		btn.on("click", function (e) {
			e.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, "300");
		});
	}
	back_to_top();

	/* ------------- Price box Js -------------*/

	let year = $(".yearly");
	let month = $(".monthly");

	let price = $(".price-number");
	let period = $(".period");

	year.on("click", function () {
		$(this).addClass("active");
		month.removeClass("active");
		price.each(function () {
			$(this).text($(this).data("year-price"));
		});
		period.each(function () {
			$(this).text($(this).data("year-period"));
		});
	});
	month.on("click", function () {
		$(this).addClass("active");
		year.removeClass("active");
		price.each(function () {
			$(this).text($(this).data("month-price"));
		});
		period.each(function () {
			$(this).text($(this).data("month-period"));
		});
	});

	// service 5 tabs
	$(".h5-service-content").on("mouseover", function () {
		$(this)
			.parent(".service-style-5")
			.addClass("active")
			.siblings()
			.removeClass("active");
	});
	// blog 8 js
	$(".h8-blog-item .blog-images").on("mouseover", function () {
		$(this)
			.parent(".h8-blog-item")
			.addClass("active")
			.siblings()
			.removeClass("active");
	});
	// testimonial tabs
	$(".h7-testimonial .testimonial-content").on("click", function () {
		$(this)
			.parent(".h7-testimonial-single")
			.addClass("active")
			.siblings()
			.removeClass("active");
	});
	// portfolio tabs
	$(".h9-case-study .h9-case-study-item").on("mouseover", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});
	// Team 10 tabs
	$(".h10-team-item").on("mouseover", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});

	$(window).on("load", function () {
		/*------------------------------------------------------
    /  WoW Js
    /------------------------------------------------------*/
		var wow = new WOW({
			boxClass: "wow", // default
			animateClass: "animated", // default
			offset: 80, // default
			callback: function (box) {
				// Ensure visibility when animation starts
				$(box).css("visibility", "visible");
				$(box).css("opacity", "1");
			},
		});
		wow.init();
	});

	// process hover effect
	const processContainer = document.querySelector("#tj-process");
	if (processContainer) {
		const processItems = processContainer?.querySelectorAll(".process-item");
		const processLineActive = processContainer?.querySelector(
			".process-line-active"
		);

		// add active class to item
		if (processItems?.length) {
			const totalPortion = 100 / processItems?.length;
			processLineActive.style.left = "0";
			processLineActive.style.top = "0";
			processItems.forEach((item, idx) => {
				item.addEventListener("mouseenter", function () {
					processItems.forEach(item2 => {
						item2.classList.remove("active");
					});
					processLineActive.style.top = `${totalPortion * idx}%`;
					this.classList.add("active");
				});
			});
		}
	}

	const processContainer2 = document.querySelector("#tj-process-2");
	if (processContainer2) {
		const processItems = processContainer2?.querySelectorAll(".process-item");
		const processLineActive = processContainer2?.querySelector(
			".process-line-active"
		);

		// add active class to item
		if (processItems?.length) {
			const totalPortion = 100 / processItems?.length;
			processLineActive.style.left = "0";
			processLineActive.style.top = "0";
			processItems.forEach((item, idx) => {
				item.addEventListener("mouseenter", function () {
					processItems.forEach(item2 => {
						item2.classList.remove("active");
					});
					processLineActive.style.left = `${totalPortion * idx}%`;
					this.classList.add("active");
				});
			});
		}
	}

	// header top toggler
	if ($(".header-topbar-toggler").length > 0) {
		const headerTop = document.querySelector(".header-topbar");
		const headerTopToggler = headerTop.querySelector(".header-topbar-toggler");

		if (headerTop) {
			console.log(headerTop.offsetHeight);
			headerTop.style.height = `${headerTop.offsetHeight}px`;
			headerTop.style.padding = `0px`;

			headerTopToggler.addEventListener("click", function () {
				headerTop.style.height = `0px`;
			});
		}
	}

	// h10 chart

	const ctx = document.querySelectorAll(".tj-pie-chart");

	if (ctx.length > 0) {
		ctx.forEach(ctxSingle => {
			const data = {
				datasets: [
					{
						label: "47",
						data: [20, 12, 15],
						backgroundColor: [
							"rgba(247, 247, 247, 0.2)",
							"rgba(247, 247, 247, 0.5)",
							"rgba(0, 117, 255, 1)",
						],
						borderWidth: 0,
						spacing: 4,
						hoverOffset: 0,
					},
				],
			};

			const options = {
				cutout: "60%",
			};

			const config = {
				type: "doughnut",
				data: data,
				options: options,
			};

			new Chart(ctxSingle, config);
		});
	}

	/* ------------- Gsap Js -------------*/

	gsap.registerPlugin(ScrollTrigger, TweenMax, ScrollToPlugin);

	gsap.config({
		nullTargetWarn: false,
	});

	/* ------------- Process scroll animation -------------*/

	/* ------------- Positon Sticky Js -------------*/

	function initStickySidebar() {
		if (window.innerWidth >= 992) {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			const startPoint = window.innerWidth >= 992 ? 100 : 120;
			gsap.to(".tj-sticky", {
				scrollTrigger: {
					trigger: ".tj-sticky",
					start: `top ${startPoint}`,
					end: `bottom ${startPoint}`,
					pin: true,
					scrub: 1,
				},
			});
		}
	}
	initStickySidebar();
	window.addEventListener("resize", () => {
		initStickySidebar();
	});

	/* ------------- Skill  Progress Bar Js -------------*/

	const progressBarController = () => {
		const progressContainers = document.querySelectorAll(".tj-progress");
		if (progressContainers?.length) {
			progressContainers.forEach(progressContainer => {
				const targetedProgressBar =
					progressContainer.querySelector(".tj-progress__bar");
				const completedPercent =
					parseInt(targetedProgressBar.getAttribute("data-perchant"), 10) || 0;

				gsap.to(targetedProgressBar, {
					width: `${completedPercent}%`,
					ease: "power2.out",
					duration: 1,
					scrollTrigger: {
						trigger: progressContainer,
						start: "top 90%",
						end: "top 30%",
					},
					onUpdate: function () {
						let progressValue = Math.round(this.progress() * 100);
						let displayPercent = Math.round(
							(completedPercent * progressValue) / 100
						);

						const percentageText = progressContainer.querySelector(
							".tj-progress__perchant"
						);
						if (percentageText) {
							percentageText.textContent = displayPercent + "%";
						}
					},
				});
			});
		}
	};
	progressBarController();

	// const lenis = new Lenis();
	// lenis.on("scroll", ScrollTrigger.update);
	// gsap.ticker.add(time => {
	// 	lenis.raf(time * 1000);
	// });
	// gsap.ticker.lagSmoothing(0);

	/* Text Effect Animation */
	if ($(".text-anim").length) {
		let staggerAmount = 0.03,
			translateXValue = -20,
			delayValue = 0.1,
			easeType = "power2.out",
			animatedTextElements = document.querySelectorAll(".text-anim");

		animatedTextElements.forEach(element => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
			gsap.from(animationSplitText.chars, {
				duration: 1,
				delay: delayValue,
				x: translateXValue,
				autoAlpha: 0,
				stagger: staggerAmount,
				ease: easeType,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});
	}

	/* Text Effect Animation */
	if ($(".hero-text-anim").length) {
		let staggerAmount = 0.05,
			delayValue = 0.4,
			easeType = "power1.out",
			heroTextElements = document.querySelectorAll(".hero-text-anim");

		heroTextElements.forEach(element => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
			gsap.from(animationSplitText.chars, {
				opacity: 0,
				duration: 0.4,
				delay: delayValue,
				ease: easeType,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});
	}

	/* Service js */
	let device_width = window.innerWidth;
	const serviceStack = gsap.utils.toArray(".service-stack");
	if (serviceStack.length > 0) {
		if (device_width > 991) {
			serviceStack.forEach(item => {
				gsap.to(item, {
					opacity: 0,
					scale: 0.9,
					y: 50,
					scrollTrigger: {
						trigger: item,
						scrub: true,
						start: "top top",
						pin: true,
						pinSpacing: false,
						markers: false,
					},
				});
			});
		}
	}

	const h6ProjectStack = gsap.utils.toArray(".project-stack");
	if (h6ProjectStack.length > 0) {
		if (device_width > 991) {
			h6ProjectStack.forEach(item => {
				gsap.to(item, {
					// opacity: 0,
					// scale: 0.9,
					// y: 50,
					scrollTrigger: {
						trigger: item,
						scrub: true,
						start: "top top",
						pin: true,
						pinSpacing: false,
						markers: false,
					},
				});
			});
		}
	}

	/* Marque js */
	gsap.to(".marquee-slider-wrapper-two", {
		scrollTrigger: {
			trigger: ".tj-project-section-two",
			start: "top center-=200",
			pin: ".marquee-slider-wrapper-two",
			end: "bottom bottom-=200",
			markers: false,
			pinSpacing: false,
			scrub: 1,
		},
	});

	// right swipe
	document.querySelectorAll(".rightSwipeWrap").forEach((wrap, i) => {
		gsap.set(wrap.querySelectorAll(".right-swipe"), {
			transformPerspective: 1200,
			x: "10rem",
			rotateY: -20,
			opacity: 0,
			transformOrigin: "right center",
		});
		gsap.to(wrap.querySelectorAll(".right-swipe"), {
			transformPerspective: 1200,
			x: 0,
			rotateY: 0,
			opacity: 1,
			delay: 0.3,
			ease: "power3.out",
			scrollTrigger: {
				trigger: wrap,
				start: "top 80%",
				id: "rightSwipeWrap-" + i,
				toggleActions: "play none none none",
				// markers: true,
			},
		});
	});

	// left swipe
	document.querySelectorAll(".leftSwipeWrap").forEach((wrap, i) => {
		gsap.set(wrap.querySelectorAll(".left-swipe"), {
			transformPerspective: 1200,
			x: "-10rem",
			rotateY: 20,
			opacity: 0,
			transformOrigin: "left center",
		});
		gsap.to(wrap.querySelectorAll(".left-swipe"), {
			transformPerspective: 1200,
			x: 0,
			rotateY: 0,
			opacity: 1,
			delay: 0.3,
			ease: "power3.out",
			scrollTrigger: {
				trigger: wrap,
				start: "top 80%",
				id: "leftSwipeWrap-" + i,
				toggleActions: "play none none none",
				// markers: true,
			},
		});
	});

	// border radius animation
	gsap.set(".tj-about-section", {
		"--br-bottom-left": "0px",
	});
	gsap.to(".tj-about-section", {
		"--br-bottom-left": "410px",
		ease: "power3.out", // extra smoothness on top of scrub
		scrollTrigger: {
			trigger: ".tj-about-section",
			start: "bottom 120%",
			end: "bottom 50%", // longer scroll for slower animation
			scrub: 0.8, // smooth scrub with inertia feel
			// markers: true,
		},
	});

	// Parallax GSAP
	document.querySelectorAll(".tjParallaxSection").forEach((section, i) => {
		const image = section.querySelector(".tjParallaxImage");
		if (image) {
			gsap.to(image, {
				y: "-25%",
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
					// id: "parallax-" + i, // optional for debugging
					// markers: true,
				},
			});
		}
	});

	// itemScrollAnimation
	const teamItems = document.querySelectorAll(".itemScrollAnimate");
	teamItems.forEach((item, index) => {
		const isEven = index % 2 === 0;

		gsap.fromTo(
			item,
			{
				transform: isEven
					? "perspective(1000px) rotateX(50deg)"
					: "perspective(1000px) rotateX(-50deg)",
			},
			{
				transform: isEven
					? "perspective(1000px) rotateX(0deg)"
					: "perspective(1000px) rotateX(0deg)",
				duration: 2,
				ease: "power3.out",
				scrollTrigger: {
					id: `teamItemTrigger-${index}`,
					trigger: item,
					start: "top 100%",
					end: "top 40%",
					scrub: true,
					// markers: true,
				},
			}
		);
	});

	// project drag js
	const $cursor = $(".tj-cursor");
	const $container = $(".project-slider-one");

	if ($container.length > 0) {
		// Center the cursor
		gsap.set($cursor, { xPercent: -50, yPercent: -50 });

		// Track pointer movement
		$(document).on("pointermove", function (e) {
			gsap.to($cursor, {
				duration: 0,
				x: e.clientX,
				y: e.clientY,
			});
		});

		// Show cursor on enter
		$container.on("mouseenter", function () {
			$cursor.css({
				opacity: 1,
				visibility: "visible",
			});
		});

		// Hide cursor on leave
		$container.on("mouseleave", function () {
			$cursor.css({
				opacity: 0,
				visibility: "hidden",
			});
		});
	}

	// Text Invert
	if ($(".tj-text-invert").length) {
		const split = new SplitText(".tj-text-invert", { type: "lines" });
		split.lines.forEach(target => {
			gsap.to(target, {
				backgroundPositionX: 0,
				ease: "none",
				scrollTrigger: {
					trigger: target,
					scrub: 1,
					start: "top 85%",
					end: "bottom center",
				},
			});
		});
	}

	document.querySelectorAll(".svg-animate").forEach(box => {
		// Check if the element has the class .svg-animate
		if (box.classList.contains("svg-animate")) {
			const paths = box.querySelectorAll("path");

			paths.forEach(path => {
				const length = path.getTotalLength();

				// Set initial state
				gsap.set(path, {
					strokeDasharray: length,
					strokeDashoffset: length,
					visibility: "visible",
					opacity: 1,
				});

				// Animate on scroll
				gsap.to(path, {
					strokeDashoffset: 0,
					duration: 1.5,
					ease: "power2.out",
					scrollTrigger: {
						trigger: box,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				});
			});
		}
	});

	// Hero Stack
	ScrollTrigger.matchMedia({
		"(min-width: 992px)": function () {
			if (document.querySelector(".heroStack .tj-hero-section")) {
				ScrollTrigger.create({
					trigger: ".tj-hero-section",
					start: "top top",
					end: "+=100%", // pin for full viewport height
					pin: true,
					pinSpacing: false,
					scrub: false,
				});
			}
		},
	});
})(jQuery);
