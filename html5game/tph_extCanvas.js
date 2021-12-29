
(function(extern, undefined){

    var X = 0;
		var Y = 0;

    extern['GetMousePosX'] = function(w) {
        return X * w;
    }
		
    extern['GetMousePosY'] = function(h) {
        return Y * h;
    }
		
		extern['GetMousePosX2'] = function(mX,mY,w,h,bw,bh) {
        return mY + (bw - ((bw*16/9)/2));
    }
		
    extern['GetMousePosY2'] = function(mX,mY,w,h,bw,bh) {
        return bh-mX;
    }
		
		function getCursorPosition(canvas, event) {
				const rect = canvas.getBoundingClientRect();
				X = (event.clientX - rect.left) / rect.width;
				Y = (event.clientY - rect.top) / rect.height;
		}

		const canvas = document.getElementById('canvas');
		canvas.addEventListener('mousemove', function(e) {
				getCursorPosition(canvas, e);
		})

})(window['extCanvas'] = window['extCanvas']||{});