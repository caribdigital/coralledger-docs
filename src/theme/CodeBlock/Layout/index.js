// Unsafe swizzle of @theme/CodeBlock/Layout (marked `unsafe` in Docusaurus 3.x).
// Re-verify rendering on every Docusaurus minor/major bump; the upstream
// component's prop surface or internal imports may change without notice.
import React from 'react';
import clsx from 'clsx';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import Buttons from '@theme/CodeBlock/Buttons';
import styles from './styles.module.css';
export default function CodeBlockLayout({ className }) {
    const { metadata } = useCodeBlockContext();
    const hasLanguageLabel = metadata.language && metadata.language !== 'text';
    return (<Container as="div" className={clsx(className, metadata.className)}>
      {(metadata.title || hasLanguageLabel) && (<div className={styles.codeBlockHeader}>
          {metadata.title && (<div className={styles.codeBlockTitle}>
              <Title>{metadata.title}</Title>
            </div>)}
          {hasLanguageLabel && (<div className={styles.codeBlockLanguage}>
              {metadata.language}
            </div>)}
        </div>)}
      <div className={styles.codeBlockContent}>
        <Content />
        <Buttons />
      </div>
    </Container>);
}
