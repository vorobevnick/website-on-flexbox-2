class ValidateForm {
    constructor() {
        this._error = document.querySelector('.error');
        this._errorName = document.querySelector('.error-name');
        this._email =  document.getElementById('email');
        this._name =  document.getElementById('name');

        document.getElementById('form').addEventListener('submit', this._submit.bind(this));
        document.getElementById('email').addEventListener('input', this._checkEmail.bind(this));
        document.getElementById('name').addEventListener('input', this._checkName.bind(this));
    }

    _submit(event) {
        if (!this._email.validity.valid) {
            event.preventDefault();

            this._error.innerHTML = "Email должен выглядеть example@email.com";
            this._error.className = "error active";

            return false;
        }

        if (!this._name.validity.valid) {
            event.preventDefault();

            this._errorName.innerHTML = "Введите имя";
            this._errorName.className = "error-name active";

            return false;
        }
    }

    _checkName() {
        if (this._name.validity.valid) {
            this._errorName.innerHTML = "";
            this._errorName.className = "error-name";
        }
    }

    _checkEmail() {
        if (this._email.validity.valid) {
            this._error.innerHTML = "";
            this._error.className = "error";
        }
    }

}

$(function() {
    $(".scroll").click(function() {
        $("html, body").animate({ scrollTop: $("header").height() + 20}, 1500);
        return false;
    });

    $(window).scroll(function() {
        if($(window).scrollTop() > 300) {
            $('.button-top').fadeIn();
        }
        else {
            $('.button-top').fadeOut();
        }
    });

    $('.button-top').click(function() {
        $('body, html').animate({scrollTop: 0}, 1500);
    });

    $("#menu").on("click","a", function (event) {
        event.preventDefault();

        let id  = $(this).attr('href'),

            top = $(id).offset().top;

        $('body,html').animate({scrollTop: top}, 1500);
    });


    $("form").submit(function() {
        event.preventDefault();
        let th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: th.serialize()
        }).done(function() {
            $('.form').find('input[type=text],[type=email], textarea').val('');
            createMessageSuccess();
        });
        return false;
    });

    function createMessageSuccess() {
        let div = document.createElement('div');
        div.className = "alert alert-success";
        div.innerHTML = "Спасибо! Ваша заявка принята";

        document.body.insertBefore(div, document.body.firstChild);
        setTimeout(function() {
            div.parentNode.removeChild(div);
        }, 5000);
    }

});

new ValidateForm();