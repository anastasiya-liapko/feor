'use strict';

$(function () {
    $('#js-sumOther').on('click', function() {
        $('#js-sumOther .radio').prop('checked', true);
    });

    $('.radio[name=sum]').on('click', function() {
        if ($(this) !== $('#js-sumOther .radio')) {
            $('#js-sumOther #sumOtherInput').removeClass('error');
            $('#js-sumOther #valid-sumOtherInput').text('');
        }
    });

    var data = {};
    var errorObject = {};

    var setError = function(errorObject) {
        $('#valid-' + errorObject.name).text(errorObject.error);
        $('#' + errorObject.name).addClass('error');
    };
    var removeError = function(inputName) {
        $('#valid-' + inputName).text('');
        $('#' + inputName).removeClass('error');
    };

    var addDisabled = function(form) {
        $('form .submit').addClass('disabled');
        $('form .submit').prop('disabled', true);
    }

    var removeDisabled = function(form) {
        $('form .submit').removeClass('disabled');
        $('form .submit').prop('disabled', false);
    }

    var validateInput = function (inputName, inputValue) {
        errorObject = {};

        if (inputValue === '' && inputName === 'sumOtherInput' && $('#js-sumOtherRadio').is(':checked')) {
            errorObject = {'name': inputName, 'error': 'Это обязательное поле'};
        } else if (inputValue === '' && inputName !== 'sumOtherInput') {
            errorObject = {'name': inputName, 'error': 'Это обязательное поле'};
        }

        return errorObject;
    };

    var checkInputs = function(element) {
        var valid = true;
        element.find('input').each(function() {
            data[$(this)[0].name] = $(this).val();
        });
        $.each(data, function (inputName, inputValue) {
            var error = validateInput(inputName, inputValue);
            if (Object.keys(error).length > 0) {
                valid = false;
            }
        });
        return valid;
    };


    $('#js-formDonate input').on('change keyup blur', function() {
        removeError($(this).attr('name'));
        var error = validateInput($(this).attr('name'), $(this).val());
        if (Object.keys(error).length > 0) {
            setError(error);
            addDisabled('#js-formDonate');
        } else {
            var inputs = checkInputs($('#js-formDonate'));
            if (inputs) {
                removeDisabled('#js-formDonate');
            } else {
                addDisabled('#js-formDonate');
            }
        }
    });

    $('#js-formDonate').submit(function(event) {
        var data = {};

        $(this).find('input').each(function() {
            data[$(this)[0].name] = $(this).val();
        })
        $.ajax({
            method: 'POST',
            url: 'upload.php',
            data: data
        })
        .done(function( msg ) {
            console.log(msg);
            var obj = jQuery.parseJSON(msg);
            console.log(obj);
        });
    
        event.preventDefault();
    });
});