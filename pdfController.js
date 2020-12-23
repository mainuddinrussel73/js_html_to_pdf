function screenshotPage() {
    var wrapper = document.getElementById('one');


    domtoimage.toPng(wrapper)
        .then(function(dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.onload = function() {

                var width = img.width;
                var height = img.height;
                let HTML_Width = width;
                let HTML_Height = height;
                let top_left_margin = 1;
                let PDF_Width = HTML_Width + (top_left_margin * 2);
                let PDF_Height = HTML_Height + (top_left_margin * 2);
                //let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
                let canvas_image_width = HTML_Width;
                let canvas_image_height = HTML_Height;
                let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
                console.log('...............................')
                console.log(totalPDFPages);
                console.log('...............................')
                let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
                let right_margin = 55;
                let left_margin = 95
                pdf.addImage(img, 'PNG', (top_left_margin + right_margin), (top_left_margin + right_margin), (canvas_image_width - left_margin), (canvas_image_height - left_margin));

                let counter = 0;

                for (let i = 1; i <= totalPDFPages; i++) {
                    counter++;
                    pdf.addPage(PDF_Width, PDF_Height);
                    pdf.addImage(img, 'PNG', (top_left_margin + right_margin), ((-(PDF_Height * i) + (top_left_margin * 4)) + right_margin), (canvas_image_width - left_margin), (canvas_image_height - left_margin));
                }
                pdf.save('file.pdf');

            }
        })
        .catch(function(error) {
            console.error('oops, something went wrong!', error);
        });


}



function load() {
    var overlay = document.getElementsByClassName('overlay');
    var wrapper = document.getElementById('wrapper');




    console.log('clicked')
    overlay[0].style.display = 'block';
    wrapper.setAttribute('class', 'blur');
    setTimeout(function() {
        alert("Hello");
        console.log('unload')
        overlay[0].style.display = 'none';
        wrapper.setAttribute('class', null);
    }, 10000);



}

function generate() {
    screenshotPage();
}