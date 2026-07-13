# Episode-2_Igniting_our_app

### What is npm?

npm is the **largest package manager** in the world. It does **not** stand for Node Package Manager. It serves as a standard repository where we can install, manage, and share reusable code (packages/libraries) for our projects.

### How to initialise npm?

```
npm init
```

This creates a `package.json` file. Use `npm init -y` to skip prompts and accept defaults.

### What is package.json file?

It is the **configuration file** for our project and npm. It stores metadata (name, version, scripts, dependencies, etc.) and tells npm what packages our project needs.

### Why do we need package.json file?

- **Dependency Management:** Tracks all project dependencies and versions. Anyone can install them with `npm install`.
- **Scripts:** Lets us define custom commands like `npm start`, `npm run build`, etc.
- **Metadata:** Stores project info (name, version, author, license, repository).
- **Reproducibility:** Ensures the same dependency versions across environments (with `package-lock.json`).

### Package

A **package** is a reusable piece of code published on the npm registry (e.g., React, Lodash). Each package has its own `package.json`.

### Dependencies

External packages our project needs. Two types:

- **dependencies** – Required for the app to run in production (e.g., React, ReactDOM).
  - Install: `npm install <package-name>`
- **devDependencies** – Required only during development/testing (e.g., Parcel, Jest, Babel).
  - Install: `npm install -D <package-name>` or `npm install --save-dev <package-name>`

Key difference:
| Aspect | dependencies | devDependencies |
|--------|-------------|-----------------|
| Available in production | ✅ Yes | ❌ No |
| Available in development | ✅ Yes | ✅ Yes |
| Installed with `npm install --production` | ✅ Yes | ❌ No |
| Example | React, Lodash, Axios | Parcel, Webpack, Jest, Babel |

### What is a Bundler?

A **bundler** is a build tool that takes our code and its dependencies and bundles them into optimized, production-ready files. It handles:

- **Minification** – Removes whitespace/comments to reduce file size.
- **Tree Shaking** – Removes unused code.
- **Code Splitting** – Breaks code into smaller chunks for faster loading.
- **Transpilation** – Converts modern JS (ES6+) for browser compatibility.
- **Dev Server** – Provides live reloading during development.

**Examples:** Parcel, Webpack, Vite, Rollup.

### What is Babel?

Babel is a **JavaScript transpiler/compiler** that converts modern JavaScript (ES6+/ESNext) into backward-compatible versions that older browsers can understand. It handles:

- **Transpilation** – Converts ES6+ features (arrow functions, template literals, destructuring, etc.) to ES5.
- **Polyfilling** – Adds missing features to older environments (e.g., Promise, Array.includes).
- **JSX Transformation** – Converts JSX (React syntax) into regular JavaScript.

### What is Webpack?

Webpack is a **module bundler** that takes modules with dependencies (JS, CSS, images, fonts) and generates static assets (bundles). It features:

- **Entry/Output** – Defines where bundling starts and where bundles are saved.
- **Loaders** – Process files (e.g., Babel-loader for JS, CSS-loader for CSS) before bundling.
- **Plugins** – Extend functionality (e.g., minification, HTML generation, environment variables).
- **Code Splitting** – Splits code into lazy-loaded chunks for better performance.
- **Hot Module Replacement (HMR)** – Updates modules in the browser without full reload.

### package.json vs package-lock.json

| Feature | package.json | package-lock.json |
|---------|-------------|-------------------|
| **Purpose** | Project config & metadata | Locks exact versions of every installed dependency |
| **Version range** | Uses `^`, `~`, or exact versions (e.g., `^2.16.4`) | Records the **exact installed version** (e.g., `2.16.4`) |
| **Auto-updated** | Manually updated when you install/remove packages | Automatically updated on every `npm install` |
| **Committed to git** | ✅ Yes (always) | ✅ Yes (should be committed) |
| **Reproducibility** | May install different minor/patch versions across environments | Ensures **identical** dependency tree across all environments |
| **Contains** | Project metadata, scripts, dependency ranges | Exact version, resolved URL, integrity hash, full dependency tree of every package |
| **Regeneration** | Created via `npm init` | Auto-generated on `npm install` |

Key Point: `package.json` defines the **range** of allowed versions, while `package-lock.json` **locks** the exact versions so every developer gets the same dependencies.

### What is node_modules?

`node_modules` is a folder created by npm that contains all the **installed packages** (dependencies) our project needs. Key points:

- **Auto-generated** – Created when you run `npm install`.
- **Heavy** – Can be very large (hundreds of MBs) due to nested dependencies.
- **Not committed to git** – Added to `.gitignore` because it can be regenerated via `npm install`.
- **Contains transitive dependencies** – Your dependencies' own dependencies are also stored here.
- **Structure** – Each package gets its own folder inside `node_modules`.

### What are Transitive Dependencies?

**Transitive dependencies** are the dependencies of our direct dependencies. In other words, if our project uses Package A, and Package A internally uses Package B, then Package B is a transitive dependency of our project.

Example:
```
Our Project
  └── React (direct dependency)
        └── loose-envify (transitive dependency of React)
              └── js-tokens (transitive dependency of loose-envify)
```

- npm automatically installs all transitive dependencies inside `node_modules`.
- They are **not listed** in our `package.json` but are present in `package-lock.json`.
- They are essential for our direct dependencies to work correctly.

### ^ (Caret) and ~ (Tilde) in Dependency Versions

These symbols prefix version numbers in `package.json` to control automatic updates:

- **`^` (Caret)** – Allows updates to **minor and patch** versions.  
  `"parcel": "^2.16.4"` → Accepts any `2.x.x` where x >= 16.4 (e.g., 2.17.0, 2.16.5) but NOT 3.0.0.  
  *Most commonly used.*

- **`~` (Tilde)** – Allows updates to **patch versions only**.  
  `"parcel": "~2.16.4"` → Accepts only `2.16.x` where x >= 4 (e.g., 2.16.5, 2.16.6) but NOT 2.17.0.

- **No symbol (exact)** – Locks to the exact version.  
  `"parcel": "2.16.4"` → Always installs exactly 2.16.4, no updates.

### What is Parcel?

Parcel is a **zero-configuration bundler** used in this episode to bundle our React app. Key features:

- **Zero Config** – Works out of the box with no config file needed.
- **Fast Builds** – Uses multi-core processing and caching for blazing-fast builds.
- **HMR (Hot Module Replacement)** – Updates modules in real-time without full page reload.
- **Automatic Transpilation** – Automatically handles Babel, PostCSS, SCSS, etc.
- **Code Splitting** – Automatically splits code for lazy loading.
- **Tree Shaking** – Removes unused code.
- **Minification** – Minifies code for production builds.
- **Dev Server** – Built-in development server with live reloading.
- **Supports JS, CSS, HTML, Images** – Handles all file types natively.
