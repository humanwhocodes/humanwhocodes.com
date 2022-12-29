---
title: "Setting up a Rust development environment with Visual Studio Code"
teaser: "Getting started with Rust development takes a few more steps than with other web-based programming languages."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - Rust
  - Visual Studio Code
---

When I decided to teach myself Rust, I naturally started looking around at what editors I could use. It turned out that most of the folks I asked online were still using Visual Studio Code for Rust. To my surprise, though, setting up a complete development environment in Visual Studio Code wasn't as straightforward as I expected. I need to find and download different tools in order to get started.

(I'm assuming you already have Visual Studio Code installed, but if not, [go install it](https://code.visualstudio.com).)

## Step 1: Download and install the `rustup`

The easiest starting point for most folks is to install [`rustup`](https://rustup.rs/). If you're coming from Node.js development, the closest analog would be the [`nvm`](https://nvm.sh) in that `rustup` not only installs everying that you need to start Rust development but also allows you to easily switch back and forth between release channels and install additional components.

When you install `rustup`, you get a complete Rust toolchain including the compiler (`rustc`) and the `cargo` (closest Node.js analog is `npm`). With those installed, you can start compiling Rust programs immediately.

You can read more about `rustup` in the [`rustup` Handbook](https://rust-lang.github.io/rustup/index.html).

## Step 2: Create a project

Technically it's not necessary to create a project to proceed to the next steps, but it will help you ensure that Visual Studio Code is set up correctly. So, create a simple project to get started by running:

```bash
cargo new hello-world
```

This command creates a new directory called `hello-world` that contains a Rust project scaffold, including:

* `Cargo.toml` - the equivalent of `package.json` for Rust
* `src/main.rs` - the Rust source file to execute

You can then `cd` into `hello-world` and run:

```bash
cargo run
```

This will execute the `src/main.rs` file and should print out "Hello world" if everything is installed correctly. (You can think of `cargo run` as an analog to `npm start`.)

Now we are ready to prepare Visual Studio Code for Rust development!

## Step 3: Install the `rust-analyzer` Visual Studio Code extension

The most important Visual Studio Code extension to install is [`rust-analyzer`](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer). You can think of `rust-analyzer` as the equivalent of the default Visual Studio Code JavaScript language server (which include TypeScript) and ESLint. Without `rust-analyzer`, you are basically just using Visual Studio Code as a text editor without all of the additional type checking, lints, and code completion that you expected.

Once installed, you can open up `src/main.rs` (or any other Rust file) and you'll get the Visual Studio Code experience that you expect. (If you get an error message saying that `rust-analyzer` couldn't find a Rust workspace, that just means the `Cargo.toml` file is missing or invalid.)

**Important:** Make sure you `cargo run` your project at least once before opening a `.rs` file in Visual Studio code. The `rust-analyzer` extension requires the build information found in the `target` directory in order to do things like code completion and symbol lookup. If it seems like you aren't getting any of that info in Visual Studio Code, stop and run `cargo run`. If that still doesn't work, make sure the file you are working on is referenced in `main.rs` or `lib.rs`. Files that aren't referenced by your primary file in some way aren't compiled and so `rust-analyzer` doesn't know about them.

## Step 4: Install the CodeLLDB Visual Studio Code extension

Out of the box, you won't be able to debug Rust code in Visual Studio Code. You'll need to install either the [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension or the [Microsoft C/C++ Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) extension. Because the Rust compiler is build on [LLVM](https://llvm.org/), you'll need one of these two extensions to generate the debug information you'll need to debug Rust programs in Visual Studio Code. Most folks seem to prefer CodeLLDB, like because it's not Microsoft-related, but either will work.

## Bonus Step: Install the `crates` Visual Studio Code extension

While this extension isn't strictly necessary, the [`crates`](https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates) extension helps ensure that you are using the most up-to-date versions of your dependencies. It does this by placing a small green checkmark to the right of each dependency in your `Cargo.toml` file. 

![The crates extension showing up-to-date green checkmarks in Cargo.toml](https://humanwhocodes.com/images/posts/2022/rust-crates-extension.png)

## Conclusion

It took me several days to get Visual Studio Code set up for Rust development by finding all of the various tools and extensions that needed to be installed to work properly. Once set up, though, Visual Studio Code is just as suitable a development environment as any other editor or IDE could be for Rust. The `rust-analyzer` extension, in particular, gives you almost everything you need to develop Rust as rapidly as JavaScript in Visual Studio Code. Adding in the other extensions really pushes Visual Studio Code into the "great" category for Rust development.
