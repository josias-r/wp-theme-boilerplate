    <footer>
      <div>
        <?php if ( is_active_sidebar( 'boilerplate-slug-footer' ) ) : ?>
          <?php dynamic_sidebar( 'boilerplate-slug-footer' ); ?>
        <?php endif; ?>
      </div>
    </footer>
  </main>
  <!-- Scripts START -->
  <script src="<?php echo get_theme_file_uri( 'assets/main.bundle.js' ); ?>"></script>
  <!-- Scripts END -->
  <?php wp_footer(); ?>
</body>
</html>
