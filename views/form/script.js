// $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
//     var $this = $(this),
//         label = $this.prev('label');
  
//         if (e.type === 'keyup') {
//               if ($this.val() === '') {
//             label.removeClass('active highlight');
//           } else {
//             label.addClass('active highlight');
//           }
//       } else if (e.type === 'blur') {
//           if( $this.val() === '' ) {
//               label.removeClass('active highlight'); 
//               } else {
//               label.removeClass('highlight');   
//               }   
//       } else if (e.type === 'focus') {
        
//         if( $this.val() === '' ) {
//               label.removeClass('highlight'); 
//               } 
//         else if( $this.val() !== '' ) {
//               label.addClass('highlight');
//               }
//       }
  
//   });
  
  $('.tab a').on('click', function (e) {
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });

  (function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                var password = document.getElementById('mtp').value;
                var confirmPassword = document.getElementById('c_mtp').value;

                if (form.checkValidity() === false || password !== confirmPassword) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (password !== confirmPassword) {
                        document.getElementById('c_mtp').setCustomValidity("Les mots de passe ne correspondent pas.");
                    } else {
                        document.getElementById('c_mtp').setCustomValidity("");
                    }
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();