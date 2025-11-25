// 封装一个可以调整物体位置和旋转角度的用户图形界面
import * as dat from "dat.gui";


export const gui = new dat.GUI();

export default function guiMove(obj) {
    gui.add(obj.position, "x", -1, 1, 0.01).name("Move X");
    gui.add(obj.position, "y", -1, 1, 0.01).name("Move Y");
    gui.add(obj.position, "z", -1, 1, 0.01).name("Move Z");

    gui.add(obj.rotation, "x", 0, 2 * Math.PI, 0.01).name("Rotate X");
    gui.add(obj.rotation, "y", 0, 2 * Math.PI, 0.01).name("Rotate X");
    gui.add(obj.rotation, "z", 0, 2 * Math.PI, 0.01).name("Rotate X");
};