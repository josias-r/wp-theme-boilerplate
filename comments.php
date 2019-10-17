<?php if ( have_comments() ) : ?>
	<hr>
	<h3><?php esc_html_e( 'Comments', 'boilerplate-slug' ); ?></h3>
	<ul class="jr_comment_list">
		<?php wp_list_comments(); ?>
	</ul>
<?php endif; ?>
