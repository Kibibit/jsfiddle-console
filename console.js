(function () {
    var _console = window.console;
    var _methods = {
        log: window.console.log,
        error: window.console.error,
        info: window.console.info,
        debug: window.console.debug,
        clear: window.console.clear,
    };

    function append (message, type) {
      let element = $('#kb-console-log');
      
      if (!element || !element.length) {
        element = $(`
<div id="kb-console-log"></div>
`).appendTo('body');
      }
      
      element.append(`
<div class="kb-${ type }">
<span class="time">[${ new Date().toUTCString() }]</span>
<span class="type">[${ type }]</span>
${ message }
</div>`);
    }

    function clear () {
        if (document.body) {
            document.body.innerHtml = null;
        }
        _methods.clear.call(_console);
    };

    function message (text, color, $message) {
        $message = document.createElement('p');
        $message.style.color = color || '#000000';
        $message.innerText = text;
        return $message;
    }

    function write (key) {
        return function () {
            Function.prototype.apply.call(_methods[key], _console, arguments);
            append(Array.prototype.slice.call(arguments).join(' '), key);
        };
    }

    window.console.clear = clear;
    window.console.error = write('error');
    window.console.log = write('log');
    window.console.info = write('info');
    window.console.debug = write('debug');

    function errorHandler (e) {
        e.preventDefault();
        console.error(e.message);
        return true;
    }

    if (window.attachEvent) {
        window.attachEvent('onerror', errorHandler);
    }
    else {
        window.addEventListener('error', errorHandler, true);
    }
}) ();
