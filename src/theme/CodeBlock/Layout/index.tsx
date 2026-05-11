import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import type {Props} from '@theme/CodeBlock/Layout';
import Buttons from '@theme/CodeBlock/Buttons';

import styles from './styles.module.css';

export default function CodeBlockLayout({className}: Props): ReactNode {
  const {metadata} = useCodeBlockContext();
  const hasLanguageLabel = metadata.language && metadata.language !== 'text';
  const languageLabel = hasLanguageLabel ? metadata.language : undefined;

  return (
    <Container as="div" className={clsx(className, metadata.className)}>
      {(metadata.title || languageLabel) && (
        <div className={styles.codeBlockHeader}>
          {metadata.title && (
            <div className={styles.codeBlockTitle}>
              <Title>{metadata.title}</Title>
            </div>
          )}
          {languageLabel && (
            <div className={styles.codeBlockLanguage}>
              {languageLabel}
            </div>
          )}
        </div>
      )}
      <div className={styles.codeBlockContent}>
        <Content />
        <Buttons />
      </div>
    </Container>
  );
}
