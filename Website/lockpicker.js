$('.column').on('click', selectOrMoveTopDisc);

let gameSettings = new URLSearchParams(window.location.search).get('id');
// const encodedData = btoa('{"key": "08f53021-c8b1-486f-875b-d59c1ee5fd98","layers": 3}'); // encode a string
// alert(encodedData);
let settings = JSON.parse(atob(gameSettings));
playGame(settings.layers)

function selectOrMoveTopDisc() {
    let selectedColumns = $('#gameBoard').find('.column.selected');

    let $selectedColumn = (selectedColumns.length > 0) ? $(selectedColumns.get(0)) : null;
    let $thisColumn = $(this);

    if (!$selectedColumn) {
        if($thisColumn.children('.disc:first-of-type').length < 1) {
            return;
        }
        $thisColumn.toggleClass('selected');
        return;
    }
    
    if ($selectedColumn.attr('id') === $thisColumn.attr('id')) {
        $thisColumn.toggleClass('selected');
        return;
    }
    
    if (validMove($selectedColumn, $thisColumn)) {
        let $disc = $($selectedColumn.children('.disc:first-of-type').get(0)).detach();
        $thisColumn.prepend($disc);
        $selectedColumn.removeClass('selected');
        incrementCounter();
        sendState();
        checkWin();
    }
}

function getDiscs(column)
{
    let discStack = [];
    var discs = $('#column' + column).children('.disc')
    for (let i = 0; i < discs.length; i++) {
        discStack.push({ disc: discs[i].classList[2] })
    }
    return discStack;
}

function sendState()
{
    let gameState = {
        gamekey: settings.key,
        difficulty: settings.layers,
        column1discs: getDiscs(1),
        column2discs: getDiscs(2),
        column3discs: getDiscs(3),
        moves: $('#gameBoard').data('score')
    }
    let er = gameState.gamekey;
    //POST gamestate to service
}

function validMove($from, $to) {
    if ($to.children('.disc').length == 0) return true;
    if ($from.children('.disc').length == 0) return false;
    let $topOfTo = $($to.children('.disc:first-of-type').get(0));
    let $topOfFrom = $($from.children('.disc:first-of-type').get(0));
    return +$topOfTo.data('layer') > +$topOfFrom.data('layer');
}

function checkWin() {
    if ($('#column1').children('.disc').length == 0 && $('#column2').children('.disc').length == 0) {
        $('#gameBoard').addClass('game-won');
        $('.column').fadeTo(1000, 0);
        $('#scoreboard').fadeTo(1000, 0);
        $('#win').fadeTo(1000, 1).css( 'zIndex', 20);
    }
}

function playGame(layers) {
    let layerCount = layers
    for (var i = 1; i <= layerCount; i++) {
        $('#column1').append('<div class="disc layer' + i + ' ' + i + '" data-layer="' + i + '"></div>');
    }
    $('.column').fadeTo(1000, 1);
    $('#scoreboard').fadeTo(1000, 1);
    $('#gameBoard').data('score', 0);
    sendState();
}

function incrementCounter() {
    let score = $('#gameBoard').data('score') + 1;
    $('#gameBoard').data('score', score);
    $('.score-display').html(score);
}