(function() {
	$(document).ready(function() {
		// toggle mobile-menu
			$(".toggle-mnu").click(function() {
				// $(this).toggleClass("on");
				// $(".main-mnu").stop(true, true).slideToggle();
				openFullpageMenu();
				return false;
			});
		// end toggle mobile-menu

		// account-dropdown
			$('.ams-account__username').click(function(e) {
				e.stopPropagation();
				$(this).parent().toggleClass('open');
			});

			$('.ams-account__dropdown, .ams-account__username').click(function(e) {
				e.stopPropagation();
			});
			$('body').click(function() {
				$('.ams-account__dropdown')
					.parent()
					.removeClass('open');
			})
		// account-dropdown

		// main menu toggle
			$('.header .main-menu a').hoverIntent({
				 over: makeTall,
				 // out: ",
				 interval: 300
			});

			function makeTall(){
				var id = $(this).attr('data-link');
				openFullpageMenu($(this).attr('data-link'));
				
			}

			function openFullpageMenu() {
				$('#courses-menu').addClass('opened');
				$('body').addClass('freeze');
			}

			$('.fullpage-menu .icon-close').click(function() {
				$(this).parent('.fullpage-menu').removeClass('opened');
				$('body').removeClass('freeze');
			})
		// end main menu toggle

		// mobile-menu acordeon
			$('.fullpage-menu .sidebar-menu__item .sidebar-menu__link').click(function() {
				var $th = $(this),
						id = $th.attr('href');

					$parent = $th.closest('.sidebar-menu__item');
					
					$parent
						.addClass('active')
						.siblings()
						.removeClass('active')
				
				// if(screen.width < 577){

					$parent
						.find('.sidebar-menu__subnav')
						.removeClass('hidden');
					
					$parent
						.siblings()
						.find('.sidebar-menu__subnav')
						.addClass('hidden');

				// }else{

					$('.fullpage-menu')
							.find(id)
							.removeClass('hidden')
							.siblings('.fullpage-menu__content')
							.addClass('hidden');
				// }
				return false;
			});
		// end mobile-menu acordeon

		// tabs
			var $tabs = $('.tabs__link');

			$tabs.on('click', function(e) {
				e.preventDefault();
				var $th = $(this),
				$href = $th.attr('href'),
				$tabs = $th.closest('.tabs'),
				$parent = $th.parent();
				$parent.addClass('tabs__item--active')
				.siblings()
				.removeClass('tabs__item--active');

				$tabs.find($href).removeClass('hidden')
				.siblings()
				.addClass('hidden');
			});
		// end tabs

		// Accordeon-----------------------------------
			$('.acordeon-link').click(function(e) {
				e.preventDefault();
				var $currentItem = $(this).closest('.acordeon-item');
				if($currentItem.hasClass('acordeon-item-with-sublist')){

					$currentItem.find('.acordeon-sublist')
					.stop(true, true)
					.slideToggle();
					// $currentItem.siblings()
					// .find('.acordeon-sublist')
					// .stop(true, true)
					// .slideUp();

					$currentItem
						.toggleClass('active')
						.siblings()
						.removeClass('active');

				}else{
					return;
				}
			});
		// end Accordeon-----------------------------------

		// popoups
			$('.to-popup').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',

			callbacks: {
				beforeOpen: function(item) {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
				
				},
				open: function() {

					var activeButton = this.content.context.activeElement;

					if(activeButton.hasAttribute('data-tab')){

						var dataTab = activeButton.getAttribute('data-tab'),
							$wantedItem = $(this.currItem.inlineElement[0]).find('[href="#' + dataTab +'"]').parent(),
							wantedId = $wantedItem.find('.tabs__link').attr('href'),
							$wantedItemParent = $wantedItem.closest('.tabs'),
							$modificatedItem = $wantedItemParent.find(wantedId);

						$wantedItem
							.addClass('tabs__item--active')
							.siblings()
							.removeClass('tabs__item--active');

						$modificatedItem
							.removeClass('hidden')
							.siblings()
							.addClass('hidden');

						clearSpheresButtons();

						$('.ams_popup__spheres')
							.removeClass('hidden');

						$('#form-spheres-forward, #second-step-form')
							.addClass('hidden');
					}
				}
			}
		});
		// end popoups

		// spheres handle
			var $spheresSelectors = $('.spheres-list .button'),
					$spheresForward = $('#form-spheres-forward');
				
			$spheresSelectors.click(function() {
				$(this).toggleClass('sphere-selected');
				var count = 0;

				$spheresSelectors.each(function(ind, elem ) {
					if($(elem).hasClass('sphere-selected')){
						count++;
						console.log('hasClass!');
					}
				});
				
				if(count > 0){
					$spheresForward.removeClass('hidden');

				}else{
					$spheresForward.addClass('hidden');
					
				}
				return false;
			});

			$spheresForward.click(function() {
				var $th = $(this),
						$parent = $th.closest('.ams_popup__spheres');

				$parent.addClass('hidden');
				$parent.next('form').removeClass('hidden');
				return false;
			});

			function clearSpheresButtons() {

				$spheresSelectors.each(function(ind, elem) {
					$(elem).removeClass('sphere-selected');
				});
			}
		// end spheres handle

		// dropdowns

			    $( ".ams-dropdown select" ).selectmenu();
			// $( ".selector" ).selectmenu( "open" );
		// end dropdowns

		// catalog page anhcor scroll
			if ($('.catalog').length > 0){

				var menuLinks = $('.menu__link');
				$('.catalog .sidebar-menu__nav li a').click(function(e){
					e.preventDefault();
					var location = $(this).attr('href'), //секция с id, равным href текущей ссылки
						sectionCoord = $(location).offset().top;
					$('html, body').animate({scrollTop: sectionCoord}, 800);
				});
			}
		// end catalog page anhcor scroll

		// jsscrollpane
			if(document.querySelector('.scroll-pane')){
				var scrollPane = $('.scroll-pane').jScrollPane({
					verticalDragMaxHeight : 168,
					animateScroll : true
				});

				var scrollPaneApi = scrollPane.data('jsp');

				scrollPaneApi.reinitialise();

				$(window).resize(function() {
					scrollPaneApi.reinitialise();
				});
				
			}
		// end jsscrollpane

		// check_visited_links
			check_visited_links();

			function check_visited_links() {

				var visited_links = JSON.parse(localStorage.getItem('visited_links')) || [];
				var links = document.querySelectorAll('.course-contents__item a');

				for( var i = 0; i < links.length; i++ ) {
					var that = links[i];
					that.onclick = function() {
						var clicked_url = this.href;
						if (visited_links.indexOf(clicked_url) == -1) {
							visited_links.push(clicked_url);
							localStorage.setItem('visited_links', JSON.stringify(visited_links));
						}
					}
					if (visited_links.indexOf(that.href) !== -1) {
						that.parentNode.className += ' visited';
					}
				}
			}
		// end check_visited_links

		// mediaelement
			if($('video').length > 0){

				$('video').mediaelementplayer({
					alwaysShowControls: true,
					videoVolume: 'horizontal',
					features: ['playpause','progress','volume','fullscreen'],
					stretching: 'responsive'
				});

			}
		// end mediaelement

		// tooltip
				console.log(document.querySelectorAll('.to-tippy') == null);
				if(document.querySelectorAll('.to-tippy').length > 0 ){
					var ttippy = new tippy('.to-tippy', {
						position: 'right',
						trigger: 'click'
					});
					
					[].forEach.call(document.querySelectorAll('.to-tippy'), function(elem) {
						elem.addEventListener('click', function(e) {
							e.preventDefault();
							// ttippy.show(popper);
							// return false;
						});
					});	
				}
		// end tooltip

		// toggle all chapters
			$('.paid-chapters .heading .ams-link').click(function() {
				$('.paid-chapters__items .acordeon-item').removeClass('active');
				$('.paid-chapters__items .acordeon-item .acordeon-sublist').slideUp();

				return false;
			});
		// end toggle all chapters

		// sticky-sidebar
			if(document.querySelectorAll('.material-sidebar').length > 0){
				var sidebar = document.querySelector('.material-sidebar');
				var stickySidebar = new StickySidebar(sidebar, {
					containerSelector: '.material .wrapper',
	        innerWrapperSelector: '.material-sidebar__inner',
	        topSpacing: 20,
	        bottomSpacing: 20,
	        resizeSensor: true
				});
				sidebar.addEventListener('affix.top.stickySidebar', function () {
					
					$('.material-sidebar').addClass('material-sidebar--padded');
				});
				sidebar.addEventListener('affix.container-bottom.stickySidebar', function () {
					
					$('.material-sidebar').removeClass('material-sidebar--padded');
				});

			}

			if(document.querySelectorAll('.material-soc').length > 0){
				var iconsSidebar = document.querySelector('.material-soc');
				var stickyIconsSidebar = new StickySidebar(iconsSidebar, {
	        containerSelector: '.material .wrapper',
	        innerWrapperSelector: '.material-soc__icons',
	        topSpacing: 20,
	        bottomSpacing: 20,
	        resizeSensor: true
	    	});

	    	iconsSidebar.addEventListener('affix.top.stickySidebar', function () {

					$('.material-soc').addClass('material-soc--toped');
				});
				iconsSidebar.addEventListener('affix.container-bottom.stickySidebar', function () {

					$('.material-soc').removeClass('material-soc--toped');
				});
			}
		// end sticky-sidebar

		});

	
})();

