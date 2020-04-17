<?php
// Disable Admin Bar
// show_admin_bar( false );

// <!-- Scripts START -->
// get_theme_file_uri( 'assets/main.bundle.js' );
// <!-- Scripts END -->

// Assets START
function boilerplate_slug_assets() {
	$main_css_path = '/assets/main.css';
	wp_enqueue_style(
		'boilerplate-slug-main-css',
		get_stylesheet_directory_uri() . $main_css_path,
		array(),
		filemtime( get_stylesheet_directory() . $main_css_path )
	);
	$main_js_path = '/assets/main.bundle.js';
	wp_enqueue_script(
		'boilerplate-slug-main-js',
		get_stylesheet_directory_uri() . $main_js_path,
		array(),
		filemtime( get_stylesheet_directory() . $main_js_path ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'boilerplate_slug_assets' );
// Assets END

// Theme Supports START
add_theme_support( 'post-thumbnails' );

add_theme_support(
	'custom-background',
	array(
		'default-image'      => get_stylesheet_directory_uri() . '/assets/images/404.svg',
		'default-preset'     => 'fill',
		'default-position-x' => 'center',
		'default-position-y' => 'center',
		'default-size'       => 'cover',
		'default-repeat'     => 'no-repeat',
		'default-color'      => '',
	)
);

// add_theme_support( 'custom-header' );

add_theme_support(
	'custom-logo',
	array(
		'height' => 100,
		'width'  => 100,
	)
);

// add_theme_support( 'automatic-feed-links' );

add_theme_support(
	'html5',
	array(
		'comment-list',
		'comment-form',
		'search-form',
		'gallery',
		'caption',
	)
);

// add_theme_support( 'title-tag' );

add_theme_support( 'customize-selective-refresh-widgets' );

// Gutenberg Theme Supports

add_theme_support( 'align-wide' );

// add_theme_support( 'editor-color-palette', array(
// array(
// 'name' => __( 'Main Color', 'boilerplate-slug' ),
// 'slug' => 'boilerplate-slug-main',
// 'color' => __( '#59384f', 'boilerplate-slug' ),
// ),
// array(
// 'name' => __( 'Light Grey', 'boilerplate-slug' ),
// 'slug' => 'boilerplate-slug-mid',
// 'color' => '#EBECF1',
// ),
// ) );
// add_theme_support( 'editor-font-sizes', array(
// array(
// 'name' => __( 'Small', 'boilerplate-slug' ),
// 'size' => 12,
// 'slug' => 'small'
// ),
// array(
// 'name' => __( 'Normal', 'boilerplate-slug' ),
// 'size' => 16,
// 'slug' => 'normal'
// ),
// ) );

// add_theme_support( 'editor-styles' );

add_theme_support( 'wp-block-styles' );

add_theme_support( 'responsive-embeds' );

add_post_type_support( 'page', 'excerpt' );
// add_filter( 'excerpt_length', function($length) {
// return 10;
// } );
// Theme Supports END

// SVG Support
function cc_mime_types( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );

// Navigations START
function boilerplate_slug_register_menus() {
	register_nav_menus(
		array(
			'header-nav' => __( 'Main Navigation', 'boilerplate-slug' ),
		)
	);
}
add_action( 'init', 'boilerplate_slug_register_menus' );
// Navigations END


// Widgets START
function boilerplate_slug_widget_areas() {
	register_sidebar(
		array(
			'name'          => __( 'Footer', 'boilerplate-slug' ),
			'id'            => 'boilerplate-slug-footer',
			'before_widget' => '',
			'after_widget'  => '',
		)
	);
}
add_action( 'widgets_init', 'boilerplate_slug_widget_areas' );
// Widgets END

// Gutenberg Assets START
function boilerplate_slug_block_editor_assets() {
	$gb_editor_css_path = '/admin/assets/editor.css';
	wp_enqueue_style(
		'boilerplate-slug-editor-css',
		get_stylesheet_directory_uri() . $gb_editor_css_path,
		array(),
		filemtime( get_stylesheet_directory() . $gb_editor_css_path )
	);
	$gb_editor_js_path = '/admin/assets/editor.js';
	wp_enqueue_script(
		'boilerplate-slug-editor-js',
		get_stylesheet_directory_uri() . $gb_editor_js_path,
		array( 'wp-blocks', 'wp-dom' ),
		filemtime( get_stylesheet_directory() . $gb_editor_js_path ),
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'boilerplate_slug_block_editor_assets' );

function boilerplate_slug_block_assets() {
	wp_enqueue_style(
		'boilerplate-slug-css',
		get_stylesheet_uri(),
		array(),
		filemtime( get_stylesheet_directory() . '/style.css' )
	);
}
add_action( 'enqueue_block_assets', 'boilerplate_slug_block_assets' );
// Gutenberg Assets END

// function custom_image_size() {
// Set default values for the upload media box
// update_option('image_default_align', 'center' );
// update_option('image_default_size', 'medium_large' );
// }
// add_action('after_setup_theme', 'custom_image_size');


// MIGRATE and REFRESH:
// // Regenerate Post Slugs
// $posts = get_posts( array (	'numberposts' => -1 ) );
//
// foreach ( $posts as $post )
// {
// check the slug and run an update if necessary
// $new_slug = sanitize_title( $post->post_title );
// if ( $post->post_name != $new_slug )
// {
// wp_update_post(
// array (
// 'ID'               => $post->ID,
// 'post_name' => $new_slug
// )
// );
// }
// }

// update_option( 'siteurl', 'https://url.josias.me/' );
// update_option( 'home', 'https://url.josias.me/' );
