import React from 'react';

export default (props) => {
  return (
    <table width="500px">
      <tbody>
        <tr>
          <td rowSpan="2">
            I AM AN IMAGE
          </td>
          <td text-align="right" vertical-align="center">
            I am reviewer {props.review}
          </td>
          <td text-align="right" vertical-align="center">
            Have some stars
          </td>
          <td text-align="right" vertical-align="center">
            This review was helpful!
          </td>
        </tr>
        <tr>
          <td word-wrap="normal" colSpan="4">
            Hello, This is my review. It is long long long long long long long long long long long long long long long long long long long long long.
          </td>
        </tr>
      </tbody>
    </table>
  )
}
