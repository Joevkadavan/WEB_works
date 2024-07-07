document.addEventListener('DOMContentLoaded', function () {
    // Create the scene
    var scene = new THREE.Scene();

    // Create the camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create the renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-container').appendChild(renderer.domElement);

    // Create the DNA helix
    var group = new THREE.Group();

    var helixRadius = 1;
    var helixHeight = 5;
    var helixTurns = 5;
    var helixSegments = 50;
    var helixMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (var i = 0; i < helixSegments; i++) {
        var theta = i / helixSegments * helixTurns * Math.PI * 2;
        var y = i / helixSegments * helixHeight - helixHeight / 2;
        var x = Math.cos(theta) * helixRadius;
        var z = Math.sin(theta) * helixRadius;

        var sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        var sphere = new THREE.Mesh(sphereGeometry, helixMaterial);
        sphere.position.set(x, y, z);
        group.add(sphere);
    }

    scene.add(group);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        group.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', function () {
        var width = window.innerWidth;
        var height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
