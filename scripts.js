document.addEventListener('DOMContentLoaded', () => {
  const editor = grapesjs.init({
    container: '#gjs',
    storageManager: { type: null }, // Disable storage to avoid saving changes
    plugins: [],
    canvas: {
      styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
      ],
      scripts: [
        'https://code.jquery.com/jquery-3.6.0.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
      ]
    }
  });

  // Load a basic template with a container and a text block
  editor.setComponents(`
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Welcome to GrapesJS!</h1>
        </div>
      </div>
    </div>
  `);
});
