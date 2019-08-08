<?php get_header(); ?>

    <div class="content-title content-title_type_news content-title_font-size_m content__title" style="background-image: url('<?php echo get_header_image_url(); ?>')">
        <div class="container container_content container_content_small content-title__container">
            <h1 class="content-title__title">Москва</h1>
        </div>
    </div>
    <!-- content__title -->

    <div class="sina-map content-inner content-inner_type_press-center content__inner">
        <div class="container container_content content-inner__container">

            <div class="sina-map__text content-inner__block container container_content container_content_small container_content_inner">
                <?php echo get_translated_field('text_ru'); ?>
            </div>
            <!-- content-inner__block -->

            <button class="sina-map__button-more button button_color_blue footer__button" data-text="читать далее">читать далее</button>
            <div class="sina-map__map mapbox-map content-inner__block-img content-inner__block-img_position_center">
                <div id="map"></div>
            </div>
            <!-- content-inner__block-img -->

        </div>
    </div>
    <!-- content__inner -->

    <div class="sina-map__orgs-wrapper more content__more">
        <div class="container container_content container_content_small more__container">

            <?php $organizations = new WP_Query(array(
                'posts_per_page' => -1,
                'orderby' => 'post_title',
                'order' => 'ASC',
                'post_type' => 'organizations',
                'tax_query' => array(
                    'relation' => 'AND',
                    array(
                        'taxonomy' => 'types',
                        'field' => 'slug',
                        'terms' => 'obshhiny-i-sinagogi'
                    ),
                    array(
                        'taxonomy' => 'administrative-units',
                        'field' => 'slug',
                        'terms' => 'moskva'
                    )
                )
            ));
            ?>

            <!-- <p class="sina-map__orgs-title more__title more__title_position_left">Общины и синагоги Москвы</p> -->

            <?php if($organizations->have_posts()): ?>
                <div class="sina-map__orgs d-flex flex-wrap align-items-start justify-content-start">
                    <?php while($organizations->have_posts()): ?>
                        <?php $organizations->the_post();  ?>
                            <div class="sina-map__org">
                                <p class="sina-map__org-title"><?php echo get_translated_field('title_ru'); ?></p>

                                <?php
                                $ravvin_moscow = get_translated_field('ravvin_moscow');
                                $chairman_moscow = get_translated_field('chairman_moscow');
                                if ((!is_empty($ravvin_moscow)) || (!is_empty($chairman_moscow))):
                                ?>
                                <div class="sina-map__org-text sina-map__org-person link_design_grey d-flex align-items-center">
                                    <span class="link__icon fas fa-user d-flex align-items-center justify-content-center"></span>
                                    <div>
                                        <?php if(!is_empty($ravvin_moscow)): ?>
                                            <span class="link__text d-inline-block">Раввин <?php echo $ravvin_moscow; ?></span>
                                        <?php endif; ?>
                                        <?php if(!is_empty($chairman_moscow)): ?>
                                            <span class="link__text d-inline-block">Председатель <?php echo $chairman_moscow; ?></span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                                <?php endif; ?>

                                <?php if(!is_empty($address = get_translated_field('address_ru'))): ?>
                                    <p class="sina-map__org-text sina-map__org-address link_design_grey d-flex align-items-center">
                                        <span class="link__icon icon-map d-flex align-items-center justify-content-center"></span>
                                        <span class="link__text"><?php echo $address; ?></span>
                                    </p>
                                <?php endif; ?>

                                <?php if(!is_empty($phone = get_field('phone'))): ?>
                                    <div class="sina-map__org-text sina-map__org-phone link link_design_grey d-flex">
                                        <span class="link__icon icon-phone d-flex align-items-center justify-content-center"></span>
                                        <div class="link__phones">
                                            <?php
                                            $phones = preg_split("/[,;]/", $phone);
                                            foreach ($phones as $item) { ?>
                                                <a href="tel:<?php echo sanitize_phone($item); ?>">
                                                    <span class="link__text"><?php echo $item; ?></span>
                                                </a>
                                            <?php } ?>
                                        </div>
                                    </div>
                                <?php endif; ?>

                                <?php if(!is_empty($metro_station_moscow = get_field('metro_station_moscow'))): ?>
                                    <p class="sina-map__org-text sina-map__org-metro link_design_grey d-flex">
                                        <span class="link__icon icon-metro d-flex align-items-center justify-content-center"></span>
                                        <span class="link__text"><?php echo $metro_station_moscow; ?></span>
                                    </p>
                                <?php endif; ?>

                                <div class="sina-map__org-social social">

                                    <?php if(!is_empty($site_url = get_field('site_url'))): ?>
                                        <a target="_blank" href="http://<?php echo $site_url; ?>" class="sina-map__org-social-link link link_type_social link_design_grey">
                                            <i class="sina-map__org-social-icon fas fa-globe-americas d-flex align-items-center justify-content-center"></i>
                                        </a>
                                    <?php endif; ?>

                                    <?php if(!is_empty($email = get_field('email'))): ?>
                                        <a href="mailto:<?php echo $email; ?>" class="sina-map__org-social-link link link_type_social link_design_grey">
                                            <i class="sina-map__org-social-icon fas fa-envelope d-flex align-items-center justify-content-center"></i>
                                        </a>
                                    <?php endif; ?>

                                    <?php if(!is_empty($youtube_url = get_field('youtube_url'))): ?>
                                        <a target="_blank" href="<?php echo get_field('youtube_url'); ?>" class="sina-map__org-social-link link link_type_social link_design_grey">
                                            <span class="sina-map__org-social-icon link__icon icon-youtube d-flex align-items-center justify-content-center"></span>
                                        </a>
                                    <?php endif; ?>

                                    <?php if(!is_empty($instagram_url = get_field('instagram_url'))): ?>
                                        <a target="_blank" href="<?php echo $instagram_url; ?>" class="sina-map__org-social-link link link_type_social link_design_grey">
                                            <span class="sina-map__org-social-icon sina-map__org-social-icon_font_s link__icon icon-instagram1 d-flex align-items-center justify-content-center"></span>
                                        </a>
                                    <?php endif; ?>

                                    <?php if(!is_empty($twitter_url = get_field('twitter_url'))): ?>
                                        <a target="_blank" href="<?php echo $twitter_url; ?>" class="sina-map__org-social-link link link_type_social link_design_grey">
                                            <span class="sina-map__org-social-icon link__icon icon-twitter d-flex align-items-center justify-content-center"></span>
                                        </a>
                                    <?php endif; ?>

                                    <?php if(!is_empty($facebook_url = get_field('facebook_url'))): ?>
                                        <a target="_blank" href="<?php echo $facebook_url; ?>" class="sina-map__org-social-link link link_type_social link_design_grey">
                                            <span class="sina-map__org-social-icon link__icon icon-facebook d-flex align-items-center justify-content-center"></span>
                                        </a>
                                    <?php endif; ?>

                                </div>
                            </div>
                    <?php
                    endwhile;
                    wp_reset_postdata();
                    ?>
                </div>
            <?php else: ?>
                <?php include('content-not-found.php'); ?>
            <?php endif; ?>
        </div>
    </div>
    <!-- more -->

    <?php $organizations = new WP_Query(array(
        'posts_per_page' => -1,
        'orderby' => 'post_title',
        'order' => 'ASC',
        'post_type' => 'organizations',
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'types',
                'field' => 'slug',
                'terms' => 'obshhiny-i-sinagogi'
            ),
            array(
                'taxonomy' => 'administrative-units',
                'field' => 'slug',
                'terms' => 'moskva'
            )
        )
    ));

    $organizations_list = array();

    if($organizations_exists = $organizations->have_posts()) 
    {
        while($organizations->have_posts()) 
        {
            $organizations->the_post();
            $id = get_post_field('ID');
            $name = get_post_field('post_title');
            $lng = get_post_field('longitude');
            $lat = get_post_field('latitude');
            $address = get_post_field('address_ru');
            
            $org_array = array(
                'id' => $id,
                'name' => $name,
                'lng' => $lng,
                'lat' => $lat,
                'address' => $address
            );
            
            array_push($organizations_list, $org_array);
        }
    }
    ?>

    <script>
        var orgsMoscow = <?php echo json_encode($organizations_list, JSON_HEX_TAG); ?>;
    </script>


<?php get_footer(); ?>