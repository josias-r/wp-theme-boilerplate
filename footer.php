    <footer>
      <div>
        <?php if ( is_active_sidebar( 'boilerplate-slug-footer' ) ) : ?>
          <?php dynamic_sidebar( 'boilerplate-slug-footer' ); ?>
        <?php endif; ?>
      </div>
    </footer>
  </main>
  <!-- Scripts START -->
  <!-- MainJS -->
  <script src="<?php bloginfo('template_url'); ?>/dist/javascripts/main.bundle.js"></script>
  <!-- Scripts END -->
  <?php wp_footer(); ?>
</body>
</html>
