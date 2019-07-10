<?php
// Disable Admin Bar
// add_filter('show_admin_bar', '__return_false');

// Theme Supports START
add_theme_support( 'post-thumbnails' );

add_theme_support( 'custom-background', array(
  'default-image'          => get_template_directory_uri().'/dist/images/404.svg',
  'default-preset'         => 'fill',
  'default-position-x'     => 'center',
  'default-position-y'     => 'center',
  'default-size'           => 'cover',
  'default-repeat'         => 'no-repeat',
  'default-color'          => '',
) );

// add_theme_support( 'custom-header' );

add_theme_support( 'custom-logo', array(
  'height'      => 100,
  'width'       => 100,
) );

// add_theme_support( 'automatic-feed-links' );

add_theme_support( 'html5', array(
  'comment-list',
  'comment-form',
  'search-form',
  'gallery',
  'caption'
) );

// add_theme_support( 'title-tag' );

add_theme_support( 'customize-selective-refresh-widgets' );

// Gutenberg Theme Supports

add_theme_support( 'align-wide' );

// add_theme_support( 'editor-color-palette', array(
//   array(
//     'name' => __( 'Yellow', 'boilerplate-slug' ),
//     'slug' => 'boilerplate-slug-yellow',
//     'color' => __( '#FFDF4C', 'boilerplate-slug' ),
//   ),
//   array(
//     'name' => 'Light Grey',
//     'slug' => 'boilerplate-slug-l-grey',
//     'color' => '#EBECF1',
//   ),
// ) );
// add_theme_support( 'editor-font-sizes', array(
//   array(
//     'name' => __( 'Small', 'boilerplate-slug' ),
//     'size' => 12,
//     'slug' => 'small'
//   ),
//   array(
//     'name' => __( 'Normal', 'boilerplate-slug' ),
//     'size' => 16,
//     'slug' => 'normal'
//   ),
// ) );

// add_theme_support( 'editor-styles' );

add_theme_support( 'wp-block-styles' );

add_theme_support( 'responsive-embeds' );

add_post_type_support( 'page', 'excerpt' );
// Theme Supports END

// SVG Support
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

// Navigations START
function register_my_menus() {
  register_nav_menus(array(
    'header-nav' => __( 'Main Navigation', 'boilerplate-slug' ),
  ));
}
add_action( 'init', 'register_my_menus' );
// Navigations END


// Widgets START
function widget_areas() {
  register_sidebar( array(
    'name'          => __( 'Footer', 'boilerplate-slug' ),
    'id'            => 'boilerplate-slug-footer',
    'before_widget' => '<div>',
    'after_widget'  => '</div>',
  ) );
}
add_action( 'widgets_init', 'widget_areas' );
// Widgets END


// function custom_image_size() {
//   // Set default values for the upload media box
//   update_option('image_default_align', 'center' );
//   update_option('image_default_size', 'medium_large' );
// }
// add_action('after_setup_theme', 'custom_image_size');

// // Regenerate Post Slugs
// $posts = get_posts( array (  'numberposts' => -1 ) );
//
// foreach ( $posts as $post )
// {
//   // check the slug and run an update if necessary
//   $new_slug = sanitize_title( $post->post_title );
//   if ( $post->post_name != $new_slug )
//   {
//     wp_update_post(
//       array (
//         'ID'        => $post->ID,
//         'post_name' => $new_slug
//       )
//     );
//   }
// }

// update_option( 'siteurl', 'https://url.josias.me/' );
// update_option( 'home', 'https://url.josias.me/' );
