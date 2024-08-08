# Three.js Interactive 3D Cube with Shadow and Transparent Background

## Overview

This project showcases a dynamic 3D scene created with Three.js, featuring an interactive 3D cube that follows the cursor. The cube is textured, projects shadows, and is illuminated by a point light. The background of the canvas is transparent, creating a clean and visually appealing effect.

![Preview](/assets/Preview.gif)

## Features

- **3D Cube**: A textured cube rotates to face the cursor.
- **Shadows**: The cube casts shadows on a plane beneath it.
- **Transparent Background**: The canvas background is transparent, making the scene adaptable to various web designs.
- **Interactive**: The cube responds to mouse movements, enhancing the interactivity of the scene.

## Setup

To get started with this project, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/threejs-interactive-cube.git
    cd threejs-interactive-cube
    ```

2. **Install Dependencies**

    This project uses Three.js from a CDN, so no additional dependencies need to be installed.

3. **Set Up the Project**

    Make sure you have the following files in your project directory:
    - `index.html`: The main HTML file.
    - `texture.jpg`: Your texture file. Place it in the correct path (`../texture.jpg`) or update the path in the JavaScript code accordingly.

4. **Run the Project**

    Open `index.html` in your preferred web browser to view the project. You can use a local server for a more robust development environment, such as [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.liveServer) in Visual Studio Code.

## Code Explanation

- **Scene Setup**: Creates a Three.js scene, a camera, and a renderer. The renderer is configured to have a transparent background.
- **Cube**: A `Mesh` with a `BoxGeometry` and a `MeshStandardMaterial` that has a texture applied. The cube is set to cast shadows.
- **Lighting**: A `PointLight` is added to illuminate the scene and cast shadows.
- **Shadow Plane**: A `PlaneGeometry` with `ShadowMaterial` is used to receive shadows from the cube.
- **Mouse Interaction**: Updates the cube's rotation to face the cursor using mouse coordinates.
- **Animation Loop**: Continuously updates the scene to render the cube's interaction with the cursor.

## Customization

- **Texture**: Replace `../texture.jpg` with your own texture file.
- **Lighting**: Adjust the `PointLight` parameters (position, intensity) to suit your scene's needs.
- **Shadow Plane**: Modify the plane's size and position as needed.


## Acknowledgments

- [Three.js](https://threejs.org/) - The JavaScript library used for 3D graphics.

## Contact

For questions or feedback, please reach out to [fdilyoussef@gmail.com](mailto:fdilyoussef@gmail.com).

---
