;(function () {
  // 移动端个人信息页
  $(document).on('click', '.setMsg .close', function () {
    console.log($('.setMsg .massage input').val(''))
  })
  //$(document).on('click', '.setPage .gender', function () {
    //$.actions({
      //actions: [{
        //text: "男",
        //onClick: function() {
          //do something
        //}
      //},{
        //text: "女",
       // onClick: function() {
          //do something
       // }
      //}]
   // });
 // })
  // tab栏切换
  $('.brand-lists .tabs li').click(function () {
      if($(this).hasClass('active')){
          $('.brand-lists .tabs li').removeClass('active');
          $('.tab-content .items').removeClass('selected');
          
          $('.search-lists .search-content').removeClass('selected');
          $('._shade').hide();
      } else {
          $(this).addClass('active').siblings().removeClass('active');
          $('.tab-content .items').eq($(this).index()).addClass('selected').siblings().removeClass('selected')
          $('._shade').show();
          $('.search-lists .search-content').eq($(this).index()).addClass('selected').siblings().removeClass('selected');
      }
  })
  // footer
  // $('.mobel-footer li').click(function () {
  //   $(this).addClass('active').siblings().removeClass('active')
  // })
  // 搜索列表
  $('._shade').click(function(){
    $(this).hide()
    $('.search-lists .search-content').removeClass('selected')
    $('.listsPage .tabs li').removeClass('active')
  });
  $(document).on('click', '.search-item .brands', function () {
    $('._shade').hide()
    $('.search-lists .search-content').removeClass('selected')
    $('.listsPage .tabs li').removeClass('active')
  })
  $(document).on('click', '.listsPage .tabs li.price', function () {
    $('._shade').hide()
  })
  // 个人设置
  $('.formRow .inputtext .radio').click(function () {
      $(this).addClass('active').siblings().removeClass('active')
  })
  $('.formRow .editPhoneButton').click(function function_name() {
      $('#telephone').css({
        'display': 'block',
        'marginTop': '8px'
      }).val($('.tel').text())
      $('.tel').hide()
  })
  // 收藏
  // $('#collect').click(function () {
  //     $(this).toggleClass('active')
  // })

/*图片放大缩小*/
var initPhotoSwipeFromDOM = function(gallerySelector) {
        // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item,
                divEl;
            for(var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element
                // 仅包括元素节点
                if(figureEl.nodeType !== 1) {
                    continue;
                }
                divEl = figureEl.children[0];
                linkEl = divEl.children[0]; // <a> element
                size = linkEl.getAttribute('data-size').split('x');
                // 创建幻灯片对象
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
                if(figureEl.children.length > 1) {
                    item.title = figureEl.children[1].innerHTML;
                }
                if(linkEl.children.length > 0) {
                    // <img> 缩略图节点, 检索缩略图网址
                    item.msrc = linkEl.children[0].getAttribute('src');
                }
                item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };

        // 查找最近的父节点
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        // 当用户点击缩略图触发
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if(!clickedListItem) {
                return;
            }
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) {
                    continue;
                }
                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if(index >= 0) {
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};
            if(hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if(pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }
            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;
            items = parseThumbnailElements(galleryElement);
            // 这里可以定义参数
            options = {
                barsSize: {
                    top: 100,
                    bottom: 100
                },
                fullscreenEl : false,
                shareButtons: [
                    {id:'wechat', label:'分享微信', url:'#'},
                    {id:'weibo', label:'新浪微博', url:'#'},
                    {id:'download', label:'保存图片', url:'{{raw_image_url}}', download:true}
                ],
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();
                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }
            };
            if(fromURL) {
                if(options.galleryPIDs) {
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            if( isNaN(options.index) ) {
                return;
            }
            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        var galleryElements = document.querySelectorAll( gallerySelector );
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

    initPhotoSwipeFromDOM('.my-gallery');

  // var initPhotoSwipeFromDOM = function(gallerySelector) {

  //       // parse slide data (url, title, size ...) from DOM elements 
  //       // (children of gallerySelector)
  //       var parseThumbnailElements = function(el) {
  //           var thumbElements = el.childNodes,
  //               numNodes = thumbElements.length,
  //               items = [],
  //               figureEl,
  //               linkEl,
  //               size,
  //               item;

  //           for(var i = 0; i < numNodes; i++) {

  //               figureEl = thumbElements[i]; // <figure> element

  //               // include only element nodes 
  //               if(figureEl.nodeType !== 1) {
  //                   continue;
  //               }

  //               linkEl = figureEl.children[0]; // <a> element

  //               size = linkEl.getAttribute('data-size').split('x');

  //               // create slide object
  //               item = {
  //                   src: linkEl.getAttribute('href'),
  //                   w: parseInt(size[0], 10),
  //                   h: parseInt(size[1], 10)
  //               };

  //               if(figureEl.children.length > 1) {
  //                   // <figcaption> content
  //                   item.title = figureEl.children[1].innerHTML;
  //               }

  //               if(linkEl.children.length > 0) {
  //                   // <img> thumbnail element, retrieving thumbnail url
  //                   item.msrc = linkEl.children[0].getAttribute('src');
  //               }

  //               item.el = figureEl; // save link to element for getThumbBoundsFn
  //               items.push(item);
  //           }

  //           return items;
  //       };

  //       // find nearest parent element
  //       var closest = function closest(el, fn) {
  //           return el && (fn(el) ? el : closest(el.parentNode, fn));
  //       };

  //       // triggers when user clicks on thumbnail
  //       var onThumbnailsClick = function(e) {
  //           e = e || window.event;
  //           e.preventDefault ? e.preventDefault() : e.returnValue = false;

  //           var eTarget = e.target || e.srcElement;

  //           // find root element of slide
  //           var clickedListItem = closest(eTarget, function(el) {
  //               return(el.tagName && el.tagName.toUpperCase() === 'FIGURE');
  //           });

  //           if(!clickedListItem) {
  //               return;
  //           }

  //           // find index of clicked item by looping through all child nodes
  //           // alternatively, you may define index via data- attribute
  //           var clickedGallery = clickedListItem.parentNode,
  //               childNodes = clickedListItem.parentNode.childNodes,
  //               numChildNodes = childNodes.length,
  //               nodeIndex = 0,
  //               index;

  //           for(var i = 0; i < numChildNodes; i++) {
  //               if(childNodes[i].nodeType !== 1) {
  //                   continue;
  //               }

  //               if(childNodes[i] === clickedListItem) {
  //                   index = nodeIndex;
  //                   break;
  //               }
  //               nodeIndex++;
  //           }

  //           if(index >= 0) {
  //               // open PhotoSwipe if valid index found
  //               openPhotoSwipe(index, clickedGallery);
  //           }
  //           return false;
  //       };

  //       // parse picture index and gallery index from URL (#&pid=1&gid=2)
  //       var photoswipeParseHash = function() {
  //           var hash = window.location.hash.substring(1),
  //               params = {};

  //           if(hash.length < 5) {
  //               return params;
  //           }

  //           var vars = hash.split('&');
  //           for(var i = 0; i < vars.length; i++) {
  //               if(!vars[i]) {
  //                   continue;
  //               }
  //               var pair = vars[i].split('=');
  //               if(pair.length < 2) {
  //                   continue;
  //               }
  //               params[pair[0]] = pair[1];
  //           }

  //           if(params.gid) {
  //               params.gid = parseInt(params.gid, 10);
  //           }

  //           return params;
  //       };

  //       var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
  //           var pswpElement = document.querySelectorAll('.pswp')[0],
  //               gallery,
  //               options,
  //               items;

  //           items = parseThumbnailElements(galleryElement);

  //           // define options (if needed)
  //           options = {
  //               // define gallery index (for URL)
  //               galleryUID: galleryElement.getAttribute('data-pswp-uid'),
  //               getThumbBoundsFn: function(index) {
  //                   // See Options -> getThumbBoundsFn section of documentation for more info
  //                   var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
  //                       pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
  //                       rect = thumbnail.getBoundingClientRect();

  //                   return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
  //               }

  //           };

  //           // PhotoSwipe opened from URL
  //           if(fromURL) {
  //               if(options.galleryPIDs) {
  //                   // parse real index when custom PIDs are used 
  //                   // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
  //                   for(var j = 0; j < items.length; j++) {
  //                       if(items[j].pid == index) {
  //                           options.index = j;
  //                           break;
  //                       }
  //                   }
  //               } else {
  //                   // in URL indexes start from 1
  //                   options.index = parseInt(index, 10) - 1;
  //               }
  //           } else {
  //               options.index = parseInt(index, 10);
  //           }

  //           // exit if index not found
  //           if(isNaN(options.index)) {
  //               return;
  //           }

  //           if(disableAnimation) {
  //               options.showAnimationDuration = 0;
  //           }

  //           // Pass data to PhotoSwipe and initialize it
  //           gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  //           gallery.init();
  //       };

  //       // loop through all gallery elements and bind events
  //       var galleryElements = document.querySelectorAll(gallerySelector);

  //       for(var i = 0, l = galleryElements.length; i < l; i++) {
  //           galleryElements[i].setAttribute('data-pswp-uid', i + 1);
  //           galleryElements[i].onclick = onThumbnailsClick;
  //       }

  //       // Parse URL and open gallery if it contains #&pid=3&gid=1
  //       var hashData = photoswipeParseHash();
  //       if(hashData.pid && hashData.gid) {
  //           openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  //       }
  // };

  // // execute above function
  // initPhotoSwipeFromDOM('.my-gallery');

  // window.onload = function() {
  //     auto_data_size();
  // };

  // function auto_data_size() {
  //     var imgss = $("figure img");
  //     imgss.each(function() {
  //         var imgs = new Image();
  //         imgs.src = $(this).attr("src");
  //         var w = imgs.width,
  //             h = imgs.height;
  //         $(this).parent("a").attr("data-size", "").attr("data-size", w + "x" + h);
  //     })
  // }

})()
