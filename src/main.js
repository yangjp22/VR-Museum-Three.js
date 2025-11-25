// 入口文件
import * as THREE from "three";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { camera, scene } from "./utils/init.js";
import guiMove from "./utils/gui.js";


const group = new THREE.Group();

const sceneInfoObj = {
    one: {  // 第一个场景里面的数据
        publicPath: "technology/1/",
        imgUrlArr: [
            "px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"
        ],
        markList: [  // 当前空间中所有的标记信息对象
            {
                name: "landMark",
                imgUrl: "other/landmark.png",
                wh: [0.05, 0.05],  // 平面宽高
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "two"  // 点击标记切换到的下一个场景数据对象的属性名
            }
        ]
    },
    two: {  // 第二个场景里面的数据
        publicPath: "technology/2/",
        imgUrlArr: [
            "px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"
        ],
        markList: [  // 当前空间中所有的标记信息对象
            {
                name: "landMark",
                imgUrl: "other/landmark.png",
                wh: [0.05, 0.05],  // 平面宽高
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "one"  // 点击标记切换到的上一个场景数据对象的属性名
            },
            {
                name: "landMark",
                imgUrl: "other/landmark.png",
                wh: [0.05, 0.05],  // 平面宽高
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "three"  // 点击标记切换到的下一个场景数据对象的属性名
            }
        ]
    },
    three: {  // 第三个场景里面的数据
        publicPath: "technology/3/",
        imgUrlArr: [
            "px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"
        ],
        markList: [  // 当前空间中所有的标记信息对象
            {
                name: "landMark",
                imgUrl: "other/landmark.png",
                wh: [0.05, 0.05],  // 平面宽高
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "two"  // 点击标记切换到的上一个场景数据对象的属性名
            },
            {
                name: "landMark",
                imgUrl: "other/landmark.png",
                wh: [0.05, 0.05],  // 平面宽高
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "four"  // 点击标记切换到的下一个场景数据对象的属性名
            }
        ]
    },
    four: {  // 第四个场景里面的数据
        publicPath: "technology/4/",
        imgUrlArr: [
            "px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"
        ],
        markList: [  // 当前空间中所有的标记信息对象
            {
                name: "landMark",
                imgUrl: "other/landmark.png",
                wh: [0.05, 0.05],  // 平面宽高
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "three"  // 点击标记切换到的上一个场景数据对象的属性名
            },
            {
                name: "dom",  // 不再是图片的标记了，而是由文字表示的路牌标记
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "five",  // 点击标记切换到的下一个场景数据对象的属性名
                active(e) {
                    setMaterialCube(sceneInfoObj.five);
                }
            }
        ]
    },
    five: {  // 第三个场景里面的数据
        publicPath: "technology/5/",
        imgUrlArr: [
            "px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"
        ],
        markList: [  // 当前空间中所有的标记信息对象
            {
                name: "landMark",
                imgUrl: "other/landmark.png",
                wh: [0.05, 0.05],  // 平面宽高
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "two"  // 点击标记切换到的上一个场景数据对象的属性名
            },
            {
                name: "landMark",
                imgUrl: "other/landmark.png",
                wh: [0.05, 0.05],  // 平面宽高
                position: [0, 0, 0],  // 位置
                rotation: [0, 0, 0],  // 旋转角度值
                targetAttr: "four"  // 点击标记切换到的下一个场景数据对象的属性名
            }
        ]
    },
}

// 创建一个新的场景
function createCube() {
    const geoCube = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    })
    const cube = new THREE.Mesh(geoCube, material);
    cube.scale.set(1, 1, -1);
    scene.add(cube);

    return cube;
}


// 场景跳转之前清除当前场景内部的标记
function clearGroup() {
    const list = [...group.children];
    list.forEach(obj => {
        if (!obj.isCSS3DObject) {
            obj.geometry.dispose();
            obj.material.dispose();
        }
        group.remove(obj);
    })
}

// 创建每一个场景
function setMaterialCube(infoObj) {
    clearGroup();  // 清除上个场景中的所有标记

    const { publicPath, imgUrlArr, markList } = infoObj;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath(publicPath);

    const material = imgUrlArr.map(imgStr => {
        const texture = textureLoader.load(imgStr);
        texture.colorSpace = THREE.SRGBColorSpace;

        return new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })
    })

    // 覆盖掉立方体原来的材质 
    cubeObj.material = material;

    markList.forEach(markObj => {
        // 如果是地上的热点标记，调用对应的函数传递标记信息对象
        if (markObj.name === "landMark") createLandMark(markObj);
        else if (markObj.name == "dom") createDomMark(markObj);
    });

    // 等所有的标记都渲染完成后，这些标记都在一个组内，然后再将组加入到场景中即可
    scene.add(group);
}


// 创建切换场景的标记 - 图片
function createLandMark(infoObj) {
    const { name, imgUrl, wh, position, rotation, targetAttr } = infoObj;

    const planeGeometry = new THREE.PlaneGeometry(...wh);
    const texture = new THREE.TextureLoader().load(imgUrl);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
    });
    const mark = new THREE.Mesh(planeGeometry, material);
    mark.position.set(...position);
    mark.rotation.set(...rotation);

    // 给地上的热点标记添加名字 - 方便在触发点击事件时快速筛选出来
    mark.name = name;
    // three.js 3D物体也可以自定义属性和值，放在对像的userData属性里面（方便后续获取绑定的这个数据）
    // 绑定这个地点上热点标记，要切换到哪个场景信息对象，对应名字属性
    mark.userData.attr = targetAttr;

    // 将所有的标记放进一个组里面，便于管理
    group.add(mark);

    guiMove(mark);
}


// 创建切换场景的标记 - 文字
function createDomMark(infoObj) {
    const { name, position, rotation, targetAttr, active } = infoObj;

    const tag = document.createElement("span");
    tag.className = "mark-style";
    tag.innerHTML = "前进";
    tag.style.pointerEvents = "all";
    tag.addEventListener("click", evt => {
        // 为了保证createDomMark函数通用，回调数据对象中的函数代码
        active(evt);
    })

    // DOM => 3d Object
    const tag3d = new CSS3DObject(tag);
    tag3d.scale.set(1 / 800, 1 / 800, 1 / 800);
    tag3d.position.set(...position);
    tag3d.rotation.set(...rotation);

    tag3d.name = name;
    mark.userData.attr = targetAttr;

    group.add(tag3);

    guiMove(mark);
}


// 点击标记时触发的切换事件
function bindClick() {
    const rayCaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    window.addEventListener("click", (evt) => {
        pointer.x = (evt.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(evt.clientY / window.innerHeight) * 2 + 1;

        rayCaster.setFromCamera(pointer, camera);
        const list = rayCaster.intersectObjects(scene.children);
        const obj = list.find(obj => obj.object.name === "landmark");  // 查找到点击的标记
        if (obj) { // 有landmark的时候才会跳转
            const nextInfoObj = sceneInfoObj[obj.userData.attr];  // 下一个场景的对应信息
            setMaterialCube(nextInfoObj);  // 渲染出下一个场景
        }
    })
}


const cubeObj = createCube();
setMaterialCube(sceneInfoObj.one);