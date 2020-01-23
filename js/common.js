(function() {
	$(document).ready(function() {
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
				 interval: 500
			});

			function makeTall(){
				var id = $(this).attr('data-link');
				openFullpageMenu($(this).attr('data-link'));
				
			}

			function openFullpageMenu(id) {
				$('#'+id).addClass('opened');
				$('body').css('overflow', 'hidden');
			}

			$('.fullpage-menu .icon-close').click(function() {
				$(this).parent('.fullpage-menu').removeClass('opened');
				$('body').css('overflow', 'auto');
			})
		// end main menu toggle

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
					// verticalDragMaxHeight : 100,
					animateScroll : true
				});

				var scrollPaneApi = scrollPane.data('jsp');

				$(window).resize(function() {
					scrollPaneApi.reinitialise();
				});
				
			}
		// end jsscrollpane

		// check_visited_links
			check_visited_links();

			function check_visited_links() {

				var visited_links = JSON.parse(localStorage.getItem('visited_links')) || [];
				var links = document.getElementsByTagName('a');

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
	});
	
})();

