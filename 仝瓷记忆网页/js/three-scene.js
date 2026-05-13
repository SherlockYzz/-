/**
 * 宋煌官瓷数字化体验平台 - Three.js 3D展示模块
 * TODO: 对接后端接口 GET /api/3d-models - 获取所有3D模型列表
 * TODO: 对接后端接口 GET /api/3d-models/{id} - 获取指定模型的GLTF/GLB文件地址
 */

let scene, camera, renderer, currentMesh, light1, light2;
let autoRotate = true;

/**
 * 初始化Three.js场景
 */
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE6F0F2);

    camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 4);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 光源
    light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(3, 5, 3);
    scene.add(light1);

    light2 = new THREE.DirectionalLight(0x94B8C0, 0.5);
    light2.position.set(-3, 3, -3);
    scene.add(light2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // 默认加载官瓷瓶模型
    createModel(0);

    // 鼠标拖拽旋转
    let isDragging = false, prevX = 0, prevY = 0, rotY = 0, rotX = 0;
    canvas.addEventListener('pointerdown', e => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
        autoRotate = false;
    });
    canvas.addEventListener('pointermove', e => {
        if (!isDragging || !currentMesh) return;
        rotY += (e.clientX - prevX) * 0.01;
        rotX += (e.clientY - prevY) * 0.01;
        rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotX));
        currentMesh.rotation.y = rotY;
        currentMesh.rotation.x = rotX;
        prevX = e.clientX;
        prevY = e.clientY;
    });
    canvas.addEventListener('pointerup', () => { isDragging = false; });

    // 滚轮缩放
    canvas.addEventListener('wheel', e => {
        e.preventDefault();
        camera.position.z = Math.max(2, Math.min(8, camera.position.z + e.deltaY * 0.005));
    }, { passive: false });

    animate();
}

/**
 * 创建3D模型
 * @param {number} type - 模型类型: 0=梅瓶, 1=莲花碗, 2=三足炉
 */
function createModel(type) {
    if (currentMesh) scene.remove(currentMesh);

    const material = new THREE.MeshPhysicalMaterial({
        color: 0x94B8C0,
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2,
    });

    if (type === 0) {
        // 梅瓶：旋转体几何
        const points = [];
        for (let i = 0; i < 20; i++) {
            const t = i / 19;
            const r = 0.3 + 0.5 * Math.sin(t * Math.PI) - 0.15 * Math.sin(t * Math.PI * 2);
            points.push(new THREE.Vector2(r * 0.8, t * 2.5 - 1.25));
        }
        const geo = new THREE.LatheGeometry(points, 48);
        currentMesh = new THREE.Mesh(geo, material);
    } else if (type === 1) {
        // 莲花碗：半球 + 碗沿
        const bowlGroup = new THREE.Group();
        const sphere = new THREE.SphereGeometry(0.8, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2);
        const bowl = new THREE.Mesh(sphere, material);
        bowl.rotation.x = Math.PI;
        bowlGroup.add(bowl);
        const rim = new THREE.TorusGeometry(0.8, 0.04, 16, 48);
        const rimMesh = new THREE.Mesh(rim, material);
        rimMesh.rotation.x = Math.PI / 2;
        bowlGroup.add(rimMesh);
        currentMesh = bowlGroup;
    } else {
        // 三足炉：圆柱体 + 三足
        const censerGroup = new THREE.Group();
        const body = new THREE.CylinderGeometry(0.6, 0.7, 0.8, 48);
        censerGroup.add(new THREE.Mesh(body, material));
        const rimGeo = new THREE.TorusGeometry(0.65, 0.04, 16, 48);
        const rimMesh = new THREE.Mesh(rimGeo, material);
        rimMesh.rotation.x = Math.PI / 2;
        rimMesh.position.y = 0.4;
        censerGroup.add(rimMesh);
        for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2;
            const leg = new THREE.CylinderGeometry(0.06, 0.08, 0.5, 16);
            const legMesh = new THREE.Mesh(leg, material);
            legMesh.position.set(Math.cos(angle) * 0.5, -0.65, Math.sin(angle) * 0.5);
            censerGroup.add(legMesh);
        }
        currentMesh = censerGroup;
    }

    currentMesh.position.y = 0;
    scene.add(currentMesh);
}

/**
 * 切换模型
 */
function switchModel(type) {
    autoRotate = true;
    createModel(type);
}

/**
 * 切换辅助光源
 */
function toggleLight() {
    light2.visible = !light2.visible;
}

/**
 * 重置摄像机视角
 */
function resetCamera() {
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0, 0);
    autoRotate = true;
    if (currentMesh) currentMesh.rotation.set(0, 0, 0);
}

/**
 * 动画循环
 */
function animate() {
    requestAnimationFrame(animate);
    if (currentMesh && autoRotate) {
        currentMesh.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
}

/**
 * 处理窗口大小变化
 */
function handleThreeResize() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || !renderer) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}
