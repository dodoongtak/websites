import * as React from 'react';
import { rem } from 'polished';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { styled } from 'gatsby-theme-stitches/src/stitches.config';

type PrismicTeamContentsDataMainBodyKeyVisualProps = {
  data: GatsbyTypes.PrismicTeamContentsDataMainBodyKeyVisual_dataFragment,
  className?: string,
};

export const query = graphql`
  fragment PrismicTeamContentsDataMainBodyKeyVisual_data on PrismicTeamContentsDataMainBodyKeyVisual {
    primary {
      key_visual_image {
        alt
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              quality: 100
            )
          }
        }
      }
      description {
        text
      }
      expanded
    }
  }
`;

const Container = styled('section', {
  display: 'grid',
  gridTemplateRows: 'auto auto',
  gap: rem(40),
  width: '100%',

  '@md': {
    contentArea: true,
    gap: rem(80),
  },
});

const ImageContainer = styled('figure', {
  variants: {
    expanded: {
      true: {
      },
      false: {
        paddingX: rem(24),
      },
    },
  },
});

const Description = styled('p', {
  contentArea: true,

  fontSize: '$body2',
  fontWeight: 'bold',
  paddingX: rem(24),

  '@md': {
    fontSize: '$subtitle2',
    paddingX: rem(0),
  },
});

const PrismicTeamContentsDataMainBodyKeyVisual: React.FC<PrismicTeamContentsDataMainBodyKeyVisualProps> = ({
  data,
  className,
}) => {
  const image = data.primary?.key_visual_image?.localFile?.childImageSharp?.gatsbyImageData && getImage(
    data.primary.key_visual_image.localFile.childImageSharp.gatsbyImageData
  );

  if (image == null) {
    return null;
  }

  return (
    <Container className={className}>
      {image && (
        <ImageContainer
          expanded={{ '@initial': data.primary.expanded ?? false, '@md': true }}
        >
          <GatsbyImage
            image={image}
            alt={data.primary?.key_visual_image?.alt ?? ''}
          />
        </ImageContainer>
      )}
      <Description>
        {data.primary.description?.text}
      </Description>
    </Container>
  );
};

export default PrismicTeamContentsDataMainBodyKeyVisual;
