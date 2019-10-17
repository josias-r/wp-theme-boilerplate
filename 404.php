<?php get_header(); ?>
<div class="container">
	<div>
		<?php if ( ! is_front_page() && ! is_home() ) : ?>
			<h1><?php esc_html_e( '404 Page not found.', 'boilerplate-slug' ); ?></h1>
		<?php endif; ?>
		<!-- Content START -->
		<div class="content">
			<p><?php esc_html_e( 'Please contact the website administrator.', 'boilerplate-slug' ); ?></p>
			<p><a class="btn" href="<?php echo esc_url( home_url() ); ?>">go back</a></p>
		</div>
		<!-- Content END -->
	</div>
</div>
<?php get_footer(); ?>
